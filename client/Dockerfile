# Use httpd Alpine image
FROM httpd:alpine

# Copy the build directory to the Apache document root
COPY build/ /usr/local/apache2/htdocs/

# Copy the .htaccess file to Apache document root
COPY .htaccess /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Enable the rewrite module in Apache configuration
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Set the AllowOverride directive to All for .htaccess support
RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf

# Start Apache when the container starts
CMD ["httpd-foreground"]

