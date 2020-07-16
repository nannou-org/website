---
title:  "Mozilla Audio Development Grant - Reaching the final milestone"
date:  "2020-07-15"
featured: "../../images/mission_partners_nannou_mozilla.png"
document_type: "post"
tags: [
    "Nannou",
    "Rust",
    "Creative Coding",
    "MOSS",
    "Mozilla",
    "Grant",
    "Audio",
]
---

*[**Nannou**](https://nannou.cc/) is a creative coding framework that aims to
make it easy for artists to express themselves with simple, fast, reliable
code.*

![MOSS Mission Partners Logo](../images/mission_partners_nannou_mozilla.png)

Towards the end of 2019, **nannou had the honour of [being awarded a
grant](https://nannou.cc/posts/moss_grant_announce) as a part of the MOSS
Mission Partners track**. The proposed work aimed to improve the state of some
foundational crates within the Rust audio ecosystem.

We are proud to announce that today marks the completion of the goals outlined
in our original proposal! The following describes our journey through the work,
the unexpected hurdles, the pleasant surprises, and a hint of what we wish to
focus on next.


### Addressing long-standing issues in [CPAL](https://github.com/rustaudio/cpal)

One of **nannou**'s core design tenets is to prefer pure-Rust solutions over
bindings to other languages where possible. This often means assisting in
driving forward progress upstream and being part of the change we want to see.

CPAL, the Cross Platform Audio Library, is a major collaborative effort by the
Rust audio community to develop a low-level, portable API around the popular
audio I/O hosts available on major platforms. A large part of our work involved
addressing some of CPAL's long-standing issues.

[![RustAudio](../images/rustaudio_logo.png)](https://github.com/RustAudio)

**Non-Blocking Streams**

The first step was to assist in landing a major overhaul of the way events are
handled throughout CPAL ([#354](https://github.com/RustAudio/cpal/pull/354)).
Previously, CPAL exposed a single EventLoop API that owned all devices and
streams would block when it was run. This overhaul refactored CPAL to more
closely match modern audio APIs, instead providing a per-stream, non-blocking
API and allowing audio processing to occur on a high-priority thread managed by
the host. This work was a significant collaborative effort originally sparked by
ishitatsuyuki. Major breaking changes like this in cross-platform libraries are
particularly difficult, as individual maintainers rarely have access to every
supported platfrom on hand. As a result, coordination and communication between
multiple contributors is often essential.

**Dynamic Sample Formats**

Next we aimed to improve the ergonomics of working with buffers of a dynamically
selected sample format in a manner that aimed to better take advantage of Rust's
type system ([#359](https://github.com/RustAudio/cpal/pull/359)). Previously,
users were required to specify their desired sample format via an enum variant
and then match on the given buffer type once every callback, despite the API
indicating that the sample format is supported prior to the streams beginning.
To improve upon this, we refactored the API to allow the user to choose between
static sample format selection ([via a
type](https://docs.rs/cpal/0.12.0/cpal/traits/trait.DeviceTrait.html#method.build_output_stream))
or dynamically handling the sample format chosen by the host (see the [raw
stream builder alternative
method](https://docs.rs/cpal/0.12.0/cpal/traits/trait.DeviceTrait.html#tymethod.build_output_stream_raw).
A big thanks to Ralith for their critical feedback and follow-up PR that
resulted in a much nicer overall outcome.

**Stream Timestamps**

One glaring hole in CPAL's stream API has been the lack of timestamps associated
with stream events. System timestamps are essential for many audio applications,
particularly those that require accurately synchronising multiple different
media formats like video playback or multimedia workstations. After some
research into existing solutions and drafting up a proposal
([#363](https://github.com/RustAudio/cpal/issues/363)), we landed a new
`StreamInstant` API ([#397](https://github.com/RustAudio/cpal/pull/397)). The
work aims to address this gap by providing system timestamps for the moment
audio is captured (via an input device), delivered to the user (via callback)
and played back (via an output device) with a friendly API modelled after the
`std::time::Instant` type.

**Requesting Buffer Sizes**

Possibly the most sought after and frequently requested change of all was the
ability to request audio buffers of a specific size
([#205](https://github.com/RustAudio/cpal/issues/205)). Having the ability to
change the size of the buffer used by the device to capture or play back audio
allows users to control the trade-off between low-latency and energy efficiency.
This is a major priority for interactive audio applications like digital audio
workstations and games, seemingly two of CPAL's major user groups. In
[#401](https://github.com/RustAudio/cpal/pull/401) we landed support for this,
giving the user the option to request a specific buffer size or allowing the
host to fallback to some default. A big thanks to sniperrifle2004 who closely
reviewed the ALSA host implementation, caught some mistakes and pointed out some
vital quirks in the ALSA API that needed addressing.

Amidst these more major changes there were of course other minor unplanned
tweaks and patches that made sense to address in between. These included
switching from `failure` to the lighter and more library-friendly `thiserror`
crate ([#340](https://github.com/RustAudio/cpal/pull/340)), renaming types to
better suit audio library conventions
([#371](https://github.com/RustAudio/cpal/pull/371)) and [many
others](https://github.com/RustAudio/cpal/pulls?q=is%3Apr+is%3Aclosed+author%3Amitchmindtree).


### CPAL + WASM

One of our major goals for nannou is to eventually allow users to compile and
run their sketches or apps on the web by targeting WASM, WGPU, and WebAudio. In
turn, one of our goals for this period of work was to make a start on a WASM +
WebAudio host for CPAL. CPAL contributor dpeckett beat us to the punch with
their proof-of-concept in [#372](https://github.com/RustAudio/cpal/pull/372) and
ishitatsuyuki provided a simple `wasm-beep` example that made it much easy to
follow and test the work locally.

After rebasing and updating dpeckett's work for the new timestamp and buffer
size APIs ([#406](https://github.com/RustAudio/cpal/pull/406)), and adding
ishitatsuyuki's `wasm-beep` as an official cpal example
([#416](https://github.com/RustAudio/cpal/pull/416)), CPAL is looking promising
as a simple way to target both native platforms and the modern web in pure Rust!

To accompany the example, we have added a [step-by-step
tutorial](https://github.com/RustAudio/cpal/wiki/Setting-up-a-new-CPAL-WASM-project)
to CPAL's wiki describing how to setup your CPAL project to target the web. To
demonstrate, we've created a (very basic) web page where you can test out CPAL
in the browser right now! TODO: Add example. Here is a link to the repo for this
example in case you would like to take a look. TODO: Add link. *We've only had
the chance to test this in desktop Firefox and Chrome - please let us know if
you run into any issues or strange behaviour!*


### `sample` becomes DASP - Digital Audio Signal Processing

When working with low-level audio in code, there is a common set of patterns and
abstractions that the vast majority of audio libraries and applications apply.
Supporting conversions between various sample formats, working with slices of
both interleaved and non-interleaved data, rate interpolation for converting
between different sample rates, just to name a few.

The `sample` crate aimed to provide these fundamentals for working with PCM
(pulse-code modulation) DSP (digital signal processing). In other words, sample
provided a suite of low-level, high-performance tools including types, traits
and functions for working with digital audio signals.

The name `sample` is a remnant of the crate's original goal at inception - to
provide a simple `Sample` trait abstraction along with a well-tested suite of
conversions between the most commonly encountered sample format types. Since
then, the crate gained a few more contributors and grew to cover more of the
aforementioned fundamentals with a collection of abstractions designed to
interoperate in a nice manner. In turn, the original name began to make less
sense.

`sample` has been renamed to `dasp`, a name that better aligns with the goal of
the project - to provide a library akin to the std, but for digital audio signal
processing. As a part of [this
refactor](https://github.com/RustAudio/dasp/pull/120), the crate has been split
into a collection of feature-gated sub-crates, greatly improving modularity and
allowing users to precisely select the tools and abstractions that they need.
You can find a simple overview of the available crates
[here](https://github.com/RustAudio/dasp#crates)

**`dasp_graph`**

`dasp_graph` is a new addition to the `dasp` crate collection for dynamically
creating and editing audio graphs. The crate is targeted towards users who
require an efficient yet flexible and dynamically configurable audio graph. Use
cases might include virtual mixers, digital audio workstations, game audio
systems, virtual modular synthesizers and related applications where the ability
to add and remove nodes and re-route audio at runtime is a must.

This work has been a long-time coming and is the result of many discussions in
the rust audio community and lessons learned over the last few years of working
with rust and audio. You can read more about `dasp_graph`, its motivations and
usage at [the PR](https://github.com/RustAudio/dasp/pull/130) and
[docs.rs](https://docs.rs/dasp_graph/0.11.0/dasp_graph/).


### Future Work

While we are happy with the work achieved over the past few months, there is of
course much more to be done! Some next steps that come to mind for CPAL include:

- Resolve some [minor follow-up web target
  issues](https://github.com/RustAudio/cpal/issues?q=is%3Aopen+is%3Aissue+label%3A%22platform+-+web%22).
- Improve mobile target support
  ([iOS](https://github.com/RustAudio/cpal/issues?q=is%3Aopen+is%3Aissue+label%3A%22platform+-+ios%22),
  [Android](https://github.com/RustAudio/cpal/labels/platform%20-%20android)).
- Events for handling the arrival/removal of devices
  ([#373](https://github.com/RustAudio/cpal/issues/373)).
- Improve handling of non-interleaved audio data layouts ([#367](https://github.com/RustAudio/cpal/issues/367)).
- Duplex stream support ([#349](https://github.com/RustAudio/cpal/issues/349)).

**CPAL & cubeb**

During our work we also came across [cubeb](https://github.com/kinetiknz/cubeb).
Like CPAL, cubeb is a cross-platform audio I/O library, though implemented in C
and C++. The project is the audio backend currently in use by Firefox, and a an
early effort at porting parts of the project have begun at
[cubeb-rs](https://github.com/djg/cubeb-rs). We would love to see an exploration
of how the two projects might collaborate and potentially combine efforts to
achieve the goal of creating a nice pure-Rust cross-platform audio I/O
experience.

**Updating nannou**

Of course, we are excited to land all of these recent improvements in `dasp` and
`cpal` in nannou! In particular, this allows us to begin experimenting with
running nannou sketches and applications on the web! [Stay
tuned](https://github.com/nannou-org/nannou/issues/7).


### Acknowledgements

Our work is but a small fraction in the grand scheme of Rust audio development -
there are many others doing great and important work! Consider joining the
[rust-audio discourse](https://rust-audio.discourse.group/), following the
repositories at the [RustAudio Github
organisation](https://github.com/rustaudio) or joining the fresh [#rust-audio
Matrix
channel](https://matrix.to/#/!OmPvYBHtyUKAbzvZFW:matrix.org?via=matrix.org) to
follow along and join the community.

Thank you again to Mozilla and the MOSS team for giving us this opportunity and
including us as a Mission Partner! Open source software tends to form the
digital foundation of the society we live in. While it is difficult to predict
which projects will succeed and reach such a foundational status, many would
never get the chance without generous opportunities like this. Thank you!


### Supporting Nannou

While this contribution marks a significant milestone in Nannou's quest for
sustainability, we still have a long way to go. If you are interested in
supporting Nannou's development, please consider becoming a contributor at [our
open collective page](https://opencollective.com/nannou).

If you would like to get to know our community a little better or simply hang
out with some like-minded creative coders, feel free to [join us on
matrix](https://matrix.to/#/+nannou:matrix.org) or if you'd prefer, the [bridged
slack channels](https://communityinviter.com/apps/nannou/nannou-slack)!
