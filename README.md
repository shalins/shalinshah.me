# [Shalin Shah's](http://www.shalinvs.tk) Blog

Copyright (c) 2012 Shalin Shah

Hi, I'm Shalin Shah and this is the source code for my blog, [http://www.shalinvs.tk](http://shalinvs.tk). You can fork this, recreate this, browse the code, and [ask me some questions about this](https://www.twitter.com/shlns)!

## How I Built It

The posts are written in html and Markdown. This blog is powered by a Ruby app called [Jekyll](http://github.com/mojombo/jekyll). Jekyll is a ruby based static site generator that takes the language Liquid and Markdown tp generate a static site with HTML files. Jekyll is just pure awesome. Some of the best things about it:

- Jekyll can be served with almost any web server, since the output of Jekyll is just flat, static HTML files.
- Very easily create a feed for feedburner and sitemap for SEO (see [atom.xml](http://www.shalinvs.tk/atom.xml) and [sitemap.xml](http://www.shalinvs.tk/sitemap.xml))
- Use AWESOME and very productive JavaScript and CSS tools like Coffeescript and SASS
- The blog requires less maintainance (no fixing site speed, or maintianing other bugs like in Wordpress)
- No posts stored in database where you can easily lose valuable posts (You can use github for keeping your files now)
- You can get it so fast that it can be under 300ms to load the website (when I first created this, before all the mods, I got a load time of [around 100ms](http://tools.pingdom.com/fpt/#!/eO6wv6GzZ/http://www.shalinvs.tk/blog))

I host the site on Amazon S3 <b>and</b> my own server, but I only use my server for the redirection and `.htaccess`. All the files are on Amazon S3. I use CNAME's to host it on two different things. I find it very convenient because all my files are located in one place, and .htaccess is located in another place so if I lose one, the other doesn't get effected. 

## Features

This blog has some very awesome features and plugins located in the _plugins directory. Some of the awesome things it can do include:
- compiling SCSS and CoffeeScript (the current version does not use coffescript and only some scss)
- generating an RSS Feed
- a tag generator for custom post tags
- an awesome sitemap.xml generator containing all of your posts
- custom image formatter with links

## Design

This is a fully responsive blog design with the scss being compiled with the compass gem and becoming normal css. The heirarchy of the blog is pretty self-explanitory. The layouts are in the _layouts folder the posts are in the _posts folder and so on. If you ever decide to fork this repo, please feel free to do so. But please, use your own design because I would not like to see hundreds of other blogs with the same design as mine. Thanks for that!

## Finally, publishing

Publishing is probably the easiest part of this whole process. As I explained above, I host my files with Amazon S3, so I could comiple the site to the _site folder with the `jekyll` command and then upload it to S3 manually. But that's slow and clunky. So, I use s3cmd to take care of this for me. As you can probably see in my `Rakefile`, I have a s3cmd deploy set up. So to deploy it, all I have to do is type `rake`, and it pretty much does everything: compiles coffeescript and scss and deploys to S3. So that is basically how my blog works. Hope you enjoy every bit of this and don't be shy to contact me if you find mistakes and bugs!

Thanks for reading, I really appreciate it!








