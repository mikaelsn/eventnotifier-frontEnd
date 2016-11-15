FROM coreos/apache
COPY dist /var/www/
CMD ["sleep","1"]