import React from 'react'

import Layout from "../components/layout"
import SEO from "../components/seo"
import styles from './home.module.scss'

const IndexPage = () => {
    return (
        <Layout>
            <SEO title="Home" keywords={["Joshua Batty", "About", "Education", "Presentations", "Performances", "Installations"]}/>
            <h1>About</h1>
            <p>Dr Joshua Batty a Berlin based <i>creative coder: artist: musician: freelancer: researcher</i>: & <i>digital alchemist</i> who is passionate about creating audiovisual <b>sensory experiences</b> with digital technology.</p>
            <p>Josh holds a Bachelor Degree in performing Arts playing jazz trumpet, completed his honours exploring multimedia interactivity with Max/MSP/Jitter and openFrameworks, and received a scholarship in order to undertake and complete his doctoral studies.</p>
            <p>He specialises in developing realtime interactive audiovisual environments, including installations for White Night and Burning Man festivals. Josh is also one half of <a href="https://www.mindbuffer.net/" target="_blank" rel="noopener noreferrer"><i>MindBuffer</i></a>, and is a co-founder of the Rust creative coding framework <a href="http://nannou.cc/" target="_blank" rel="noopener noreferrer"><i>Nannou</i></a>.</p>
            <p>Professionally, Josh has worked on a number of industry projects whose clients include, IBM, National Gallery of Victoria, Scienceworks, SBS, Ogilvy Australia, Myers, National Australia Bank, Deakin (University) Motion Lab, Mushroom Records and the Design Institute of Australia.</p>

            <div className={styles.cv_list}>
                <h3>Education:</h3>
                <ul>
                    <li>2011 - 2014 : Doctor of Philosophy (Audiovisual Granular Synthesis) : RMIT University</li>
                    <li>2009 - 2010 : Bachelor of Art (Honours) : RMIT University</li>
                    <li>2005 - 2007 : Bachelor of Music : Victorian College of the Arts</li>
                    <li>2004 - 2005 : Certificate IV Audio Engineering : JMC Academy</li>
                    <li>2003 - 2004 : Certificate IV Jazz Studies : Western Australian Academy of Performing Arts</li>
                </ul>

                <h3>Presentations:</h3>
                <ul>
                    <li>2019 : Rust and Tell : Berlin, Germany</li>
                    <li>2017 : Melbourne Knowledge Week : Melbourne, Australia</li>
                    <li>2016 : Melbourne International Film Festival : Melbourne, Australia</li>
                    <li>2015 : Resonate : Belgrade, Serbia</li>
                    <li>2015 : Pause Festival : Melbourne, Australia</li>
                    <li>2013 : Interactive Entertainment Conference : Melbourne, Australia</li>
                    <li>2012 : Carnival of Creativity : Sattal, India</li>
                    <li>2010 : New Interface for Musical Expression : Sydney, Australia</li>
                    <li>2009 : Apple Create World Conference : Brisbane, Australia</li>
                </ul>
                
                <h3>Performances & Installations</h3>
                <ul>
                    <li>2019 : Melbourne Museum : Melbourne, Australia</li>
                    <li>2018 : Fade Festival : Girona, Spain </li>
                    <li>2018 : Scienceworks : Melbourne, Australia</li>
                    <li>2018 : Rainbow Serpent Festival : Lexton, Australia </li>
                    <li>2017 : Sea Festival : Nha Trang, Vietnam</li>
                    <li>2017 : Scienceworks : Melbourne, Australia</li>
                    <li>2017 : Melbourne Knowledge Week : Melbourne, Australia</li>
                    <li>2017 : White Night : Melbourne, Australia</li>
                    <li>2017 : Rainbow Serpent Festival : Lexton, Australia </li>
                    <li>2016 : Organic Audio : Melbourne, Australia </li>
                    <li>2016 : White Night : Melbourne, Australia</li>
                    <li>2016 : Rainbow Serpent Festival : Lexton, Australia</li>
                    <li>2015 : Animating Spaces : Townsville, Australia </li>
                    <li>2015 : Organic Audio : Melbourne, Australia </li>
                    <li>2014 : Earthcore Festival : Pyalong, Australia </li>
                    <li>2014 : White Night : Melbourne, Australia </li>
                    <li>2013 : Burning Man : Nevada, USA</li>
                    <li>2012 : Eclipse Festival : Cairns, Australia</li>
                    <li>2011 : Deliverance Festival : NSW, Australia</li>
                </ul>
            </div>
        </Layout>
    )
}


export default IndexPage