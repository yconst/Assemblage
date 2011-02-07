# Assemblage

Assemblage is a template for the Stacey CMS. I developed it for my online portfolio and it turned out quite nice so I decided to release it as a ready-to-use template. Assemblage differs from most static templates in that it generates layouts for project indices dynamically using client-side scripting. In this sense, I tend to see it as a kind of "other half" for the Stacey CMS: Stacey organizes and provides the static content and Assemblage presents it in a dynamic and efficient way.

Almost all of the navigation and layout in the main page is build on top of Javascript and jQuery. A special layout plugin has been developed for this purpose (which will be released separately once it is more thoroughly evaluated), based on ideas from [jQuery Masonry][2] and [vGrid][3]. The concept behind these plugins is to arrange a collection of  elements in a layout that is as spatially efficient as possible, while maintaining their order. The benefit from this approach is that screen estate is used optimally and the layout may adapt to various browser widths, which makes it compatible with a wide range of devices.

Navigation relies on the concept of filtering. When the index page loads, all projects are visible as preview boxes. Sliding the navigation panel and selecting a category or sub-category hides all preview boxes except the ones belonging to the selected category. Clicking on a category will show all of it's items as well as those of all of it's sub-categories. 

The same navigational functionality as the home page is provided for every category page, with the only difference that the navigation of each category includes only it's own contents.

The page template on the other hand follows a completely different, clean approach that focuses  first and foremost on bringing the content forward. Navigation is there at the end of the project pages. The project template also features a nice and clean print style so your content shows best in print as well as on screen Partials are available for downloads (_downloads folder), pdfs, linkrolls (files in the _links folder), video, html fragments and inclusion of [Disqus][4]-powered comments.

Finally, it comes along with the [DejaVu sans typeface][5].

###Installation

Following the installation guidelines set by the Stacey CMS, installation of Assemblage is a snap. Just replace your "public" and "templates" folders and you're set to go, provided that you have the same exhibition names as the original Stacey installation (e.g. index.html, page.html). Assemblage does not require any modification of the core components of stacey (that is, the /app folder).

###Known issues and limitations:

- This is a beta release. While tested on some browsers (including IE 6), it's not what you'd call bulletproof.
- Feeds and sitemaps are just copied from the original Stacey distribution. No change there.
- The link system needs redesign.
- No documentation! (but still easy to install..)

[1]: http://www.staceyapp.com
[2]: http://desandro.com/resources/jquery-masonry/
[3]: http://blog.xlune.com/2009/09/jqueryvgrid.html
[4]: http://disqus.com/
[5]: http://www.fontsquirrel.com/fonts/DejaVu-Sans

###License

Copyright (c) 2011, Yiannis Chatzikonstantinou
http://www.yconst.com
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.