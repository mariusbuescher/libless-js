# libless.js : Web-Frontend ohne Ballast

> Hochperformante Frontends ohne JavaScript und CSS Bibliotheken

## Setup

Es ist lediglich ein Webserver nötig. Der Document Root sollte auf das
htdocs-Verzeichnis des Projektes zeigen.

### Beispiele

Beispiele um einen entsprechenden Server einzurichten.

#### php auf der Konsole

```
php -S 127.0.0.1:8080 -t htdocs
```

#### Apache

```apache
<VirtualHost *:80>
   ServerName libless.js.local
   ServerAdmin webmaster@localhost

   DocumentRoot "/path/to/project/htdocs"

   <Directory "/path/to/project/htdocs">
       Options +Indexes
       Order allow,deny
       Allow from all
   </Directory>

   DirectoryIndex index.php index.html

</VirtualHost>
```
