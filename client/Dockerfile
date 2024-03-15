# Use an official Apache image as a base image

FROM httpd:2.4-alpine



# Set the working directory inside the container

WORKDIR /usr/local/apache2/htdocs



# Copy the built frontend files into the default Apache serving directory

COPY build/ .

# Enable mod_rewrite module for .htaccess support

#RUN a2enmod rewrite


# Enable mod_rewrite module for .htaccess support

RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf



# Set the AllowOverride directive to All for .htaccess support

RUN sed -i '/<Directory "\/usr\/local\/apache2\/htdocs">/,/<\/Directory>/ s/AllowOverride None/AllowOverride All/' /usr/local/apache2/conf/httpd.conf



# Expose the port that the Apache server will run on (port 80 by default)

EXPOSE 80


