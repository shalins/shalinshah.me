require 'rubygems'
require 'rake'

#
# Compile
#

desc "Compile everything"
task :compile do
  sh "compass compile"
  sh "jekyll build"
end

#
# Watch & continuously compile
#

desc "Watch-compile jekyll site"
task :jekyll do
  sh "jekyll serve --watch --port 2000"
end

desc "Watch-compile SCSS with Compass"
task :compass do
  sh "compass watch"
end

#
# Deploy
#
task :default => :deploy


desc "Deploy to S3"
task :deploy do
  sh "jekyll"
  sh "s3cmd sync _site/* s3://www.shalinvs.tk"
  sh "compass compile"
  sh "rm -r _site"
end