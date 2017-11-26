FROM precond/base

LABEL Description="template production image"

COPY dist/site.tgz /tmp/

RUN cd / \
 && tar xf /tmp/site.tgz \
 && chown -R www-data:www-data /site \
 && rm -rf /tmp/site.tgz

WORKDIR /site

CMD ["/usr/local/bin/wsgi_runner.sh"]
