---
layout: post
title: "Set Up Your Amazon EC2"
tags:
- Tutorial
- Tips and Tricks
- Coding
---

So, if you want have an Amazon EC2 instance to run <a href="http://www.wordpress.org/" target="_blank">Wordpress</a> or simply a website you made, you can do that for cheap using Amazon's <a href="http://aws.amazon.com/ec2/" target="_blank">Elastic Compute Cloud</a> (EC2). So let's get right into it! You will be using the command line for this (or PuTTY), but if you don't know, that's okay, because I'll cover that. 

Also, If I'm going too slow, I'm sorry, but please bare with me because I made this tutorial for people that had and didn't have any prior experience. 

<h2>Step 1: Create an Account</h2>

Obviously, you need to create your AWS account; you can sign up <a href="http://aws.amazon.com/ec2/" target="_blank">here</a>. You have to provide your credit card to register and you'll need a valid phone number because Amazon will call you as part of the process. Amazon offers a <strong>Free Usage Tier</strong>, which is great to explore the services and even host real apps without being charged. You should look at the <a href="http://aws.amazon.com/free/" target="_blank">details</a>.


<h2>Step 2: Create an Instance</h2>

Now that you have an account, we can proceed to creating our instance.
So, go to your management console, and then click the EC2 tab (it should be under the Compute and Networking section)

What type of EC2 instance should you use? I used a Micro instance because it is free for 1 year and also very cheap. Here are the <a href="http://aws.amazon.com/ec2/instance-types/" target="_blank">instances</a> It may depend on your traffic. If you get a few thousand visitors a day, then you may want a larger instance. For now, I'll go with the micro instance. 

Click the big "Launch Instance" button. Make sure "Classic Wizard" is selected and click "Continue". Then choose an AMI. I chose the Basic 32-bit Amazon Linux AMI.
Instance details: Select the Instance Type you want to use. I chose Micro because it's free (t1.micro).
Create a new key pair. Enter a name for your key pair (i.e. shalin) and download your key pair (i.e. shalin.pem).

<em><strong>NOTE: DO NOT give anyone you key pair. It the access key to your whole instance. Don't lose or delete it either, otherwise you won't be able to connect to your instance!</strong></em>


Select the create new security group, give it a name and description, and then, for the create the new rule, select:
DNS (add rule)
SSH (add rule)
HTTP (add rule)
POP3 (add rule)
SMTP (add rule)
MYSQL (add rule)

Then, finally launch you instance.

<h2>Step 3: SSH into your Instance</h2>

On the sidebar, click on the tab "Elastic IP's" and find the button that says "Allocate New Address"
Make sure EC2 is selected and click "Yes, Allocate". Once you do that, you want to click on the address you created and select "Associate Address" and associate it to your instance.

Once your instance is running, you can ssh into it. SSH stands for secure shell. It means you connecting to something that it remote from your computer. For example, you could connect to another device or computer if you had their ip address and password. 

First, you need to identify the address of your instance: Select the instance in the AWS Management Console, and look for the Public DNS in the instance description (bottom part of the screen).

<img src="/images/posts/EC2%20Management%20Console.png" />

Then, open up the terminal application. For mac, click &#8984; Command + Space and search terminal or open the terminal app. For linux, go the terminal app.

Once you are in terminal, enter this command
<code>chmod 600 Downloads/shalin.pem</code>
And change the .pem file's full path and name.

Then Connect:
<code>ssh -i Downloads/shalin.pem ec2-user@<em>ec2-your-public-dns-of-your-instance.amazonaws.com</em></code>
or you can type 
<code>ssh -i Downloads/shalin.pem ec2-user@<em>you ip you just associated</em></code> either one works.
Make sure you change the .pem file's full path and name and your public DNS.

Hit "Enter", you will be asked: "Are you sure you want to continue connecting (yes/no)?" Type <em><strong>yes</strong></em>.

<h2>Step 4: The Basics</h2>
Okay, so now you've most likely followed everything in this tutorial successfully and now have a running instance that you've connected to. Lets begin the server stuff.
 
<h3>Understanding The Command Line...It's very hard, at first</h3>
Here are the basic terminal commands
<ul>
	<li>The <code>man</code> command is for a manual or help on something. (i.e. <code>man ls</code>)</li>
	<li>The <code>ls</code> command is to view the items in the directory.
</li>
	<li>The <code>cd</code> command is to go into or out of a folder (directory) like this <code>cd /</code> moves you to the very very main directory and <code>cd ../</code> moves you back one directory.
</li>
	<li>The <code>sudo</code> command is to become the Super-User, meaning you can do everything. Only use this when you have to, as this can be dangerous.
</li>
</ul>
<strong>One of the most important command is vim or vi. It is a text editor that is built in the command line to edit text files directly. Type in <code>man vim</code> to read about vim. To edit something you type <code>vim <em>file-name.txt</em></code></strong>

<a href="http://ss64.com/osx/" title="All commands" target="_blank">More Commands...</a>


<h2>Step 5: Useful Software</h2>
You have a server running now, but it can't do anything useful...yet...
 
<h3>Installing Apache</h3>
So we will allow this server to display a simple website. For that, we will need to install Apache.

Before you do anything, become the root user of this server, so type 
<code>sudo su</code>

To install the Apache Web Server, type:
<code>yum install httpd</code>

Start the Apache Web Server:
<code>service httpd start</code>
Make sure it's running.
<code>service httpd status</code>

Now your website is working! To test your Web Server, open a browser and access your web site: http://ec2-the-public-dns-of-your-instance.amazonaws.com (Use your actual public DNS name). You should see a standard Amazon place holder page.


<h3>Installing PHP</h3>

To install PHP, type:
<code>yum install php php-mysql</code>

Restart the Apache Web Server:
<code>service httpd restart</code>

Create a page to test your PHP installation:
<code>cd /var/www/html</code>
<code>vim test.php</code>
Type i to start the insert mode
Type <code>< ?php phpinfo() ?></code>
Press "Control+C" (mac, windows, and linux)
Then type :wq to write the file and quit vim

Open a browser and access test.php to test your PHP installation: http://ec2-the-public-dns-of-your-instance.amazonaws.com/test.php (Use your actual public DNS name).

If you don't want this file, go back onto terminal and type:
<code>rm test.php</code>

<code>/var/www/html/</code> is your root directory, meaning, that any files that you put in here, will automatically be put on your public DNS


<h3>Installing MySQL</h3>

To install MySQL, type:
<code>yum install mysql mysql-server</code>

Then Start MySQL
<code>service mysqld start</code>

Then Set A New Password:
<code>/usr/bin/mysqladmin -u root password 'new-password'</code>

<h3>MySQL Security</h3>

Before using MySQL in production, you'll want to improve your MySQL installation security. Run:

<code>mysql_secure_installation</code>
This will help you set a password for the root account, remove anonymous-user accounts, and remove the test database.

<h3>phpMyAdmin</h3>

We will now set up an awesome php and mysql interface called phpmyadmin
That will help run queries and optimize our databases.
Run this command to download it 
<code>wget http://sourceforge.net/projects/phpmyadmin/files/phpMyAdmin/3.5.3/phpMyAdmin-3.5.3-all-languages.zip</code>

After it has downloaded, unzip it:
<code>unzip phpMyAdmin-3.5.3-all-languages.zip -C /var/www/html</code>

Then rename the folder:
<code>mv phpMyAdmin-3.4.1-all-languages phpmyadmin</code>

And finally remove the old folder
<code>rm -r phpMyAdmin-3.5.3-all-languages.zip</code>

Open a browser and access phpmyadmin/ to test your PHP installation: http://ec2-your-public-dns-of-your-instance.amazonaws.com/phpmyadmin/ (Use your actual public DNS name).

Then configure all the stuff it tells you to.

<h3>Keep MySQL In Good Shape</h3>

Over time your MySQL tables will get fragmented and queries will take longer to complete. You can keep your tables in top shape by regularly running OPTIMIZE TABLE on all your tables. But, since you’ll never remember to do this regularly, we should set up a cron job to do this.

Open up your crontab file:
<code>crontab -e</code>

Then, add the following line:
<code>@weekly mysqlcheck -o --user=root --password=your password here -A</code>

Also, you can do the same from phpmyadmin manually to verify that it works correctly.


<h2>Step 6: Security</h2>

If your going to make a website and put it on the internet, it has to be <strong><em>really</em></strong> secure. There are a bunch or people that will mess with your server or write a script to hack it. So, you have to prevent these.

<h3>httpd.conf</h3>
So first, enter this command:
<code>vim /etc/conf/httpd/httpd.conf</code>

Your <strong>httpd.conf</strong> file should now be open. <strong><em>DO NOT</em></strong> mess around with this unless you know what you're doing otherwise you may screw everything up.

Scroll down and look for this piece of code:

<div class="highlight"><pre><code class="bash">
&lt;directory "/var/www/html"&gt;
    Options Indexes FollowSymLinks
    AllowOverride None
    Order allow,deny
    Allow from all
&lt;/directory&gt;
</code></pre></div>

Press i then change this to:

<div class="highlight"><pre><code class="bash">
&lt;directory "/var/www/html"&gt;
    Options Indexes FollowSymLinks
    AllowOverride All
    Order allow,deny
    Allow from all
&lt;/directory&gt;
</code></pre></div>

Make sure that <code>AllowOverride</code> is set to <code>All</code> otherwise, what we are about to do won't work.
Next hit Control+C and type <code>:wq</code> 

<h3>.htaccess</h3>
Great! Now do:
<code>cd /var/www/html/</code>
 
and them create a file named .htaccess:
<code>vim .htaccess</code>

You should get a blank text document because we haven't put anything in it.
Here is a list of things you should put in this file to make it more secure.

<h4>Remove Access To Your Important Files And .htaccess</h4>

<div class="highlight"><pre><code class="bash">
&lt;filesmatch ".(htaccess|htpasswd|ini|phps|fla|psd|log|sh)$"&gt;
 Order Allow,Deny
 Deny from all
&lt;/filesmatch&gt;
</code></pre></div>

<div class="highlight"><pre><code class="bash">
&lt;files ~ "^.*\.([Hh][Tt][Aa])"&lt;
order allow,deny
deny from all
satisfy all
&lt;/files&lt;
</code></pre></div>



<h4>Disable Directory Browsing</h4>
<div class="highlight"><pre><code class="bash">Options All -Indexes</code></pre></div>

<h4>No Spam (Bad Bots and Hackers)</h4>
<div class="highlight"><pre><code class="bash">
# ----------------------------------------------------------------------^M
# No Spam (Bad Bots and Hackers)
# ----------------------------------------------------------------------^M

RewriteEngine On ^M
RewriteCond %{HTTP_USER_AGENT} ^BlackWidow [OR] 
RewriteCond %{HTTP_USER_AGENT} ^Bot\ mailto:craftbot@yahoo.com [OR] 
RewriteCond %{HTTP_USER_AGENT} ^ChinaClaw [OR] 
RewriteCond %{HTTP_USER_AGENT} ^Custo [OR] 
RewriteCond %{HTTP_USER_AGENT} ^DISCo [OR] 
RewriteCond %{HTTP_USER_AGENT} ^Download\ Demon [OR] 
RewriteCond %{HTTP_USER_AGENT} ^eCatch [OR] 
RewriteCond %{HTTP_USER_AGENT} ^EirGrabber [OR] 
RewriteCond %{HTTP_USER_AGENT} ^EmailSiphon [OR]
RewriteCond %{HTTP_USER_AGENT} ^EmailWolf [OR] 
RewriteCond %{HTTP_USER_AGENT} ^Express\ WebPictures [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^ExtractorPro [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^EyeNetIE [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^FlashGet [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^GetRight [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^GetWeb! [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Go!Zilla [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Go-Ahead-Got-It [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^GrabNet [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Grafula [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^HMView [OR] ^M
RewriteCond %{HTTP_USER_AGENT} HTTrack [NC,OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Image\ Stripper [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Image\ Sucker [OR] ^M
RewriteCond %{HTTP_USER_AGENT} Indy\ Library [NC,OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^InterGET [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Internet\ Ninja [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^JetCar [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^JOC\ Web\ Spider [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^larbin [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^LeechFTP [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Mass\ Downloader [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^MIDown\ tool [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Mister\ PiX [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Navroad [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^NearSite [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^NetAnts [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^NetSpider [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Net\ Vampire [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^NetZIP [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Octopus [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Offline\ Explorer [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Offline\ Navigator [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^PageGrabber [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Papa\ Foto [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^pavuk [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^pcBrowser [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^RealDownload [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^ReGet [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^SiteSnagger [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^SmartDownload [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^SuperBot [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^SuperHTTP [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Surfbot [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^tAkeOut [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Teleport\ Pro [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^VoidEYE [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Web\ Image\ Collector [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Web\ Sucker [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebAuto [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebCopier [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebFetch [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebGo\ IS [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebLeacher [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebReaper [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebSauger [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Website\ eXtractor [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Website\ Quester [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebStripper [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebWhacker [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WebZIP [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Wget [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Widow [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^WWWOFFLE [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Xaldon\ WebSpider [OR] ^M
RewriteCond %{HTTP_USER_AGENT} ^Zeus ^M
RewriteRule ^.* - [F,L]^M
</code></pre></div>

<h4>Compression</h4>
<div class="highlight"><pre><code class="bash">
# ----------------------------------------------------------------------
# Gzip compression
# ----------------------------------------------------------------------

&lt;ifmodule mod_deflate.c&gt;

  # Force deflate for mangled headers developer.yahoo.com/blogs/ydn/posts/2010/12/pushing-beyond-gzipping/
  &lt;/ifmodule&gt;&lt;ifmodule mod_setenvif.c&gt;
    &lt;/ifmodule&gt;&lt;ifmodule mod_headers.c&gt;
      SetEnvIfNoCase ^(Accept-EncodXng|X-cept-Encoding|X{15}|~{15}|-{15})$ ^((gzip|deflate)\s*,?\s*)+|[X~-]{4,13}$ HAVE_Accept-Encoding
      RequestHeader append Accept-Encoding "gzip,deflate" env=HAVE_Accept-Encoding^M
    &lt;/ifmodule&gt;

  # HTML, TXT, CSS, JavaScript, JSON, XML, HTC:
  &lt;ifmodule filter_module&gt;
    FilterDeclare   COMPRESS
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $text/html
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $text/css
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $text/plain
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $text/xml
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $text/x-component
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/javascript
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/json
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/xml
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/xhtml+xml
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/rss+xml
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/atom+xml
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/vnd.ms-fontobject
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $image/svg+xml
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $image/x-icon
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $application/x-font-ttf
    FilterProvider  COMPRESS  DEFLATE resp=Content-Type $font/opentype
    FilterChain     COMPRESS
    FilterProtocol  COMPRESS  DEFLATE change=yes;byteranges=no
  &lt;/ifmodule&gt;

  &lt;ifmodule !mod_filter.c&gt;
    # Legacy versions of Apache
    AddOutputFilterByType DEFLATE text/html text/plain text/css application/json
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE text/xml application/xml text/x-component
    AddOutputFilterByType DEFLATE application/xhtml+xml application/rss+xml application/atom+xml
    AddOutputFilterByType DEFLATE image/x-icon image/svg+xml application/vnd.ms-fontobject application/x-font-ttf font/opentype
  &lt;/ifmodule&gt;

</code></pre></div>

<h4>Error Documents</h4>
<div class="highlight"><pre><code class="bash">
#---------------ERROR DOCUMENTS---------------#

#BAD_REQUEST
ErrorDocument 400 /var/www/html/400.php
 
#UNAUTHORIZED
ErrorDocument 401 /var/www/html/401.php
 
#FORBIDDEN
ErrorDocument 403 /var/www/html/403.php
 
#NOT_FOUND (Most Common)
ErrorDocument 404 /var/www/html/404.php
</code></pre></div>

<h2>Amazon EC2 is Awesome!</h2>
I hope you found my setup recipe (tutorial) for Amazon EC2 helpful. Sign up for <a href="https://aws.amazon.com/ec2" target="_blank">Amazon EC2</a>!

If you want to buy a domain, please use <a href="Http://www.namecheap.com?aff=39838">this link</a> and I will get $1.00 off on my yearly plan for my domains. If not, you can use the <a href="http://www.namecheap.com/" target="_blank">normal link</a>.