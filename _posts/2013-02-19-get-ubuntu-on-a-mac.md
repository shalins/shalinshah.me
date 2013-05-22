---
layout: post
title: "Installing Ubuntu on a Mac"
image: http://3.bp.blogspot.com/-yXFJ_2wREoI/UBt1WHzaopI/AAAAAAAAAZo/f-yG6vwhRZI/s1600/0.jpg
tags:
- Tutorial
- Tips and Tricks
---

I have a 13 inch Macbook Pro and I just wanted to see if I could get Ubuntu running alongside OSX Mountain Lion. It's really not as hard to do that as I expected. You can even add three Operating Systems if you like and it would run fine. I just wanted to show the way I did it. Please, before beginning, **Make a backup**!!! Have a backup already? Great! Then let's get started.

## Step 1: Install rEFIt

'rEFIt' is an beautiful (think BURG) boot-interrupter that allows you to boot between OS X and your Linux distribution(s) of choice.
<img src="/images/posts/rEFIt.jpg">
Unlike a typical PC where the GRUB boot-loader is used to present your dual-boot options, Intel Mac users need to install something extra. rEFIt is really easy to install and should only take like 5 minutes. It only has 3 steps!

1. Download the [rEFIt-0.14.dmg](http://prdownloads.sourceforge.net/refit/rEFIt-0.14.dmg?download) disk image and extract it (double-click on it)
2. Once the 'rEFIt' folder opens, double-click the 'rEFIt.mpkg' package
3. Finish installing it on your computer.

And you're done! Incase any issues arise, rEFIt has a [troubleshooting section](http://refit.sourceforge.net/help/) to help you.


## Step 2: Partition your hard-drive

Partitioning your hard-drive is basically creating parts of if or resizing it.
We need to make some extra space for our Ubuntu install so we will need to create a partition.

<img src="/images/posts/partition.jpg">

To partition your disk, just:

-	Open up Disk Utility. 
-	Click your main hard-drive from the left hand pane. 
-	On the tabs, look for the tab that says 'Partition' and click on it. 
-	Click on the "+" button and add the size directly in the "Size" box. (I used 360 GB of space since I wanted to make sure I had enough memory.)

Be generous when you choose the amount of space because changing it later on can cause some problems. This took a while for me, but this shouldn't take too long for you.

## Step three: Set up Ubuntu Disk

<img src="/images/posts/ubuntudisk.png" width="200px">

Phew! If you have the Ubuntu installer disk ready, skip this step. Okay so, first you have to [download the Ubuntu OS](http://www.ubuntu.com/download/desktop) and burn onto a disk that has about 800 MB of free memory (you need 791.3 MB to be exact). That is if you got the Ubuntu 12.10 64 Bit one. After you download it (fast or slow depending on your internet connection), you can burn the disk with Disk Utility or with Finder (I used Finder). That should be pretty easy to do.

## Step 4: Reboot with a LiveCD

<img src="/images/posts/ubuntu-livecd.jpg">

Pop your cd right into your computer and then reboot. Upon reboot, press "c" to boot from the cd you just popped in. 

## Step 5: Install to your partition

If you're an iMac user using bluetooth peripherals do be aware that these will not work out of the box in Ubuntu, so have a wired keyboard and mouse to hand.

Proceed to install Ubuntu on the "free space" partition you created earlier. Ubuntu may prompt you to install it on freespace (double check the size) or, if it doesn't or you just want to be super-cautious choose the "Advanced" option from the partition screen.

From here select (check the box under "format") "free space" and choose the "EXT4" filesystem when asked, and mount point should be set as "/".

The above looks a bit crazy, but once you're in the partition editor of the LiveCD it's straightforward.

I should also add that I don't usually bother adding Swap space but you may wish to.

## Step 5: Reboot (and you're done!)

<img src="/images/posts/reboot.jpg">

Reboot you Mac and select Linux from the rEFIt bootloader when it comes up. If you're using a bluetooth keyboard you will need to press a button on your keyboard and wait a second before you are able to select boot entries with rEFIt. But other than that, congradualtions, you now have Linux Ubuntu running on you Mac!








