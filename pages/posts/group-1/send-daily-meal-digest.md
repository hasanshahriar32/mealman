# Send Daily Meal Digest

\---\
title: Microwave study\
date: 2021/3/19\
description: View examples of all possible Markdown options.\
tag: microwave\
author: You\
\---



### Pages with Dynamic Routes

Next.js supports pages with dynamic routes. For example, if you create a file called `pages/posts/[id].js`, then it will be accessible at `posts/1`, `posts/2`, etc.

> To learn more about dynamic routing, check the [Dynamic Routing documentation](../../../docs/routing/dynamic-routes.md).

## Pre-rendering

By default, Next.js **pre-renders** every page. This means that Next.js generates HTML for each page in advance, instead of having it all done by client-side JavaScript. Pre-rendering can result in better performance and SEO.

Each generated HTML is associated with minimal JavaScript code necessary for that page. When a page is loaded by the browser, its JavaScript code runs and makes the page fully interactive. (This process is called _hydration_.)

### Two forms of Pre-rendering

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

* [**Static Generation (Recommended)**](send-daily-meal-digest.md#static-generation-recommended): The HTML is generated at **build time** and will be reused on each request.
* [**Server-side Rendering**](send-daily-meal-digest.md#server-side-rendering): The HTML is generated on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form you'd like to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
