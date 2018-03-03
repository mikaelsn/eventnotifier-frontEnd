#!/usr/bin/python

from pygremlin import *

import sys, requests, json, os

def passOrfail(result):
    if result:
        return "PASS"
    else:
        return "FAIL"

if len(sys.argv) < 2:
    print "usage: run_recipe.py topologySpec"
    sys.exit(1)

_, topologyFilename, = sys.argv

debugMode = (os.getenv('GREMLINSDK_DEBUG', "") != "")
if not os.path.isfile(topologyFilename):
    print u"Topology file {} not found".format(topologyFilename)
    sys.exit(2)

with open(topologyFilename) as fp:
    app = json.load(fp)

topology = ApplicationGraph(app)
if debugMode:
    print "Using topology:\n", topology


fg = FailureGenerator(topology, debug=debugMode)
fg.clear_rules_from_all_proxies()
fg.overload_service(dest='emailservice', source='eventservice')
testID = fg.start_new_test()

print ('Use `postman` to inject test requests,\n\twith HTTP header X-Gremlin-ID: <header-value>\n\tpress Enter key to continue to validation phase')
a = sys.stdin.read(1)

ac = AssertionChecker("localhost:29200", testID, debug=debugMode)
results = ac.check_assertions(checklist)
exit_status = 0

for check in results:
    print 'Check %s %s %s' % (check.name, check.info, passOrfail(check.success))
    if not check.success:
        exit_status = 1

sys.exit(exit_status)
