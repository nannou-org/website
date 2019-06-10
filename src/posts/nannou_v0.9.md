---
title:  "Nannou Update - Vulkan, LASERs and more!"
date:  "09-06-2019"
featured: "../images/nannou_update_featured.jpg"
tags: [
    "Nannou",
    "Rust",
    "Creative Coding",
    "Vulkan",
    "Lasers",
    "MindBuffer",
]
---

<br>

**Nannou** is an open source, creative coding framework for Rust. Today marks
one of the biggest milestones for the project since its launch - the release of
version **0.9**.

This version is particularly special for our community as it lands the last
*eight months* of progress into master and onto crates.io. While some of us have
already been using the work-in-progress 0.9 branch in our personal and
commercial work over the past few months, it is a relief to finally be able to
land and share the progress with the wider world!

<br>

<iframe title="Daily Sketch 821 by MacTuiTui using Nannou" src="https://player.vimeo.com/video/340933400?autoplay=1&loop=1&autopause=0?muted=1&background=1" width="640" height="270" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

<i>Daily Sketch #821 by <a href="https://www.instagram.com/mactuitui/">Mactuitui</a> using nannou.</i>

<br>

Normally, we aim to publish far more regularly and
incrementally, however this release involved some significant changes and we
wanted to do our best to get them right.

- [Vulkan Graphics](#Vulkan-Graphics)
- [Simpler API](#Simpler-Event-API)
- [LASER Support](#LASER-Support)
- [The Guide](#The-Guide)
- [What's Next?](#Whats-Next)
- [Join Us!](#Join-Us)

<br>

## Vulkan Graphics

The largest change is without a doubt the switch from OpenGL to
[Vulkan](https://www.khronos.org/vulkan/) for handling cross-platform graphics.

![nannou_plus_vulkan](nannou_plus_vulkan.png)

Our primary reasons for making the switch are:

- Gaining support for compiling and running languages other than GLSL (e.g.
  [RLSL](https://github.com/MaikKlein/rlsl), HLSL) on the GPU via Vulkan's
  low-level SPIR-V representation.
- Access to finer-grained control over the GPU for more thorough optimisation if
  necessary.
- No longer having to deal with OpenGL bugs resulting from inconsistent
  implementations across different devices and versions.
- Switching to a more modern, future-proof, cross-platform graphics standard.

The change has been large enough that we decided to dedicate a follow-up post
with all the juicy details, including how we automated the installation process
for macOS, some of the trade-offs involved in leaving OpenGL, our experience
working with vulkano, future plans for graphics in nannou and more.

<iframe title="Nannou + Vulkan in action. A Magic Mirror Installation for Museums Victoria by MindBuffer" src="https://player.vimeo.com/video/340928061?autoplay=1&loop=1&autopause=0?muted=1&background=1" width="640" height="270" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

*Nannou + Vulkan in action. A Magic Mirror Installation for Museums Victoria by
[MindBuffer](https://mindbuffer.net).*

<br>

## Simpler Event API

Nannou aims to make it easy to work with application and windowing events in a
way that feels simple and intuitive to both new and old Rust users. In this
release, we greatly simplified the API for registering functions for handling
different kinds of events.

Here is an example of what a fresh nannou app might look like today:

```rust
use nannou::prelude::*;

struct Model {
    window: window::Id,
}

fn main() {
    nannou::app(model)
        .run();
}

fn model(app: &App) -> Model {
    let window = app
        .new_window()
        .view(view)
        .build()
        .unwrap();
    Model { window }
}

fn view(app: &App, model: &Model, frame: Frame) -> Frame {
    let draw = app.draw();
    draw.background().color(LIGHT_PURPLE);
    draw.ellipse().color(DARK_BLUE);
    frame
}
```

If we want to add a function for updating our model, we can easily do so by
first adding a function to be called on each update:

```rust
fn update(app: &App, model: &mut Model, update: Update) {
    // Let's update the model here.
}
```

Now we register our new update function in our app builder:

```rust
nannou::app(model)
    .update(update) // Add the update function to the app here.
    .run();
```

We can now update our model over time!

The same approach applies if we want to add keyboard, mouse or any other kind of
event. Here's another example for handling mouse presses:

```rust
fn mouse_pressed(app: &App, model: &mut Model, button: MouseButton) {
    // Do something on mouse pressed.
}
```

```rust
let window = app
    .new_window()
    .mouse_pressed(mouse_pressed) // Add the mouse pressed function to the window here.
    .view(view)
    .build()
    .unwrap()
```

You can find an example demonstrating nearly all application and window events
available in nannou
[here](https://github.com/nannou-org/nannou/blob/master/examples/all_functions.rs).

<br>

## LASER Support

One of the things that separates a creative coding environment from a game
engine is the diversity in access to different kinds of creative I/O. While a
game engine might revolve around a single window and stereo sound, digital
artists often need access to multiple windows for projection mapping or large
displays, *n*-channel spatial audio for exhibitions, networked DMX for
controlling lighting fixtures and much more.

<iframe title="Lattice by MindBuffer, developed using nannou" src="https://player.vimeo.com/video/340422829?autoplay=1&loop=1&autopause=0?muted=1&background=1" width="640" height="180" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

*LATTICE by [MindBuffer](https://www.mindbuffer.net/), developed using nannou.*

One of our personal favourite mediums to work with is LASER projection. It's
hard to beat the immersive feeling of being engulfed in a beam of light so
bright that it carves the air around you into planes of colours that you feel
like you can touch! That said, access to the necessary hardware and software
required to start playing with these tools yourself can be expensive and laced
with frustrating, proprietary licensing.

Version **0.9** brings with it [**nannou_laser**](https://github.com/nannou-org/nannou_laser) -
a new crate dedicated to easy access to well optimised, LASER projector DAC
streams. **nannou_laser** is our attempt to begin democratising this space at the
software level. The crate features a suite of optimisation passes to account for
tricky details such as draw order optimisation, inertia reduction, blanking
delays and sharp angle delays - features that are difficult to find in existing
free and open-source solutions.

![nannou_laser_api](nannou_laser_api.png)

If you happen to have a LASER projector and a DAC supporting the Ether Dream
protocol, you can begin playing with **nannou_laser** by checking out [these
examples](https://github.com/nannou-org/nannou/tree/master/examples/laser).
Otherwise, you can find more info on **nannou_laser** at [the
README](https://github.com/nannou-org/nannou_laser) and on
[docs.rs](https://docs.rs/nannou_laser).

<br>

## The Guide

**Nannou** aims to be more than just a framework of useful tools - we wish to
build a community. We envision a future where nannou can be used to introduce
programming to students in a more fun and interactive manner, or as an
entry-point for artists seeking to expand their canvas beyond their familiar
domain into the land of code and information.

A pivotal step in achieving this future is breaking down the boundary of entry
for new and potential users and to provide a suite of resources that educators
can use for working with new students. One of the approaches we have recently
began working on in order to achieve this is to create a nannou "oracle" of
sorts in the form of [an online guide](https://guide.nannou.cc/). The guide aims
to be a one-stop-shop for all information, tips and tricks someone could desire
related to nannou.

[![nannou_guide_preview](nannou_guide_preview.png)](https://guide.nannou.cc)

Currently, the guide features a ["Why
Nannou?"](https://guide.nannou.cc/why_nannou.html) chapter outlining the goals
and motivations for the project and a ["Getting
Started"](https://guide.nannou.cc/getting_started.html) chapter that walks users
through setting up nannou and starting their first project.

The plan from here is to begin building a large suite of
["Tutorials"](https://guide.nannou.cc/tutorials.html) where users can dive
straight into whatever their desired use-case is for nannou. Current ideas
include "Drawing 3D shapes", "Creating multi-window GUI", "Setting up microphone
input", and [many, many more](https://guide.nannou.cc/tutorials.html). In order
to get through such a large number of tutorials, the plan is to run regular
sprints where each of the core maintainers jump on slack together and aim to
write one full tutorial each while assisting any other members of the community
who might also be interested in hanging out and contributing. We'll release more
info on this soon!

You can check out the guide in its current state
[here](https://guide.nannou.cc). If you are interested in contributing, you can
find the repo [here](https://github.com/nannou-org/guide).

<br>

## What's Next?

### Near Term

- **Patches and fixes** - Seeing as the entire graphics backend has been
  replaced, we expect some users may run into small quirks and bugs that we
  might have missed. We have set aside some time to make sure we can address
  these and make any patches that might be necessary.
- **Lyon 2D** - While nannou's current implementation of 2D *kind* of works,
  there are a few glaring bugs and many missing features.
  [Lyon](https://github.com/nical/lyon) is an exceptional, relatively mature and
  well researched effort at solving 2D graphics *properly*. We are hoping that
  the switch will solve most existing bugs in nannou's 2D API and add a suite of
  missing features such as curves, GPU-accelerated tesselation and more.
- **Higher-level graphics abstractions** - While the new Vulkan-based graphics
  API is already far ahead of our old OpenGL implementation, a lot of work still
  remains. The current API around building render passes and graphics pipelines
  is still quite low level. Now that 0.9 is out we plan to investigate how we
  can simplify common patterns and create higher-level abstractions without
  sacrificing the current low-level access. We have been building a suite of
  [vulkan
  examples](https://github.com/nannou-org/nannou/tree/master/examples/vulkan) to
  help identify these patterns and guide progress from the top-down.
- **The Guide** - As mentioned above!

### Long Term

- **Gantz** - [gantz](https://github.com/nannou-org/gantz) is a library for
  creating and evaluating executable directed graphs at runtime. Currently, it's
  a research project investigating how we can eventually provide a way to
  compose together creative applications at runtime, inspired by graphical
  programming environments such as Max/MSP, Pure Data and Touch Designer.
- **GUI Editor** - Having created [the conrod
  project](https://github.com/pistondevelopers/conrod), rewriting it multiple
  times and using it in multiple commercial projects over the past few years, we
  have learned a lot about how to do GUI in Rust and what we feel is important!
  Our vision for nannou is to eventually allow for composing GUIs in a graphical
  environment. We anticipate that **gantz** will likely play a pivotal role in
  the project, as dynamically composed GUI also tends to imply dynamically
  composed programs. *You can find some more of my personal thoughts on the topic
  [here](https://github.com/nannou-org/nannou/issues/2#issuecomment-429036368).*

These are just a few of the goals that come to mind as I write this post. Feel
free to visit the [Goals section](https://guide.nannou.cc/why_nannou.html#goals) of the
guide to get an idea of what else we have planned, or visit the [issue
tracker](https://github.com/nannou-org/nannou/issues) to find more detailed
plans or suggest your own.

<br>

## Join Us!

Since we announced the project almost a year ago, nannou has grown from a small
three-person team into a small community. Feel free to join us!

Most of us hang out in the [nannou
slack](https://communityinviter.com/apps/nannou/nannou-slack) and would be more
than happy to meet you and chat about all things nannou :)

<br>
<br>
<center>Get started with nannou <b><a href="https://guide.nannou.cc/">here</a></b>!</center>
<br>
<br>


