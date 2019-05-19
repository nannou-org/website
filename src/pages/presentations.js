import React from 'react'
import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from './presentations.module.scss'

const PresentationsPage = () => {
    return (
        <Layout>
            <SEO title="Presentations" keywords={["Joshua Batty", "MindBuffer", "Rust", "Audiovisual", "Presentations"]}/>
            <h1>Presentations</h1>

            <main>
                <div className={styles.card}>
                    <div className={styles.info}>
                        <strong>Generative Sensory Stimulus</strong>
                    </div>
                    <div className={styles.videowrapper}>
                        <iframe title="Generative Sensory Stimulus" src="https://player.vimeo.com/video/148945840" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                    <div className={styles.info}>
                        <p>Mindbuffer was invited to speak at the first instalment of the public talk series from SIAL Sound Studios. Myself and Mitchell Nordine presented the evolution of MindBuffer and why we felt the need to develop custom tools instead of using off the shelf software to realise our creative vision. Also includes live demonstrations MindBuffer’s generative music software (Jen) and realtime audiovisual granular synthesis software (Kortex) as well as others.</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.info}>
                        <strong>Pause Fest - Project Pixel Squared</strong>
                    </div>
                    <div className={styles.videowrapper}>
                        <iframe title="Pause Fest - Project Pixel Squared" src="https://player.vimeo.com/video/123128976" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                    <div className={styles.info}>
                        <p>I was invited along with Richard De Souza, Kit Webster and Sean Healy to sit on a panel discussing modern realtime visual techniques and audio visual installations as part of the 2015 Pause Festival in Melbourne. Was really great to be involved in and share ideas / techniques with fellow realtime visual ninjas.</p>
                    </div>
                </div>

                <div className={styles.card}>
                    <div className={styles.info}>
                        <strong>History of Audiovisual Explorations</strong>
                    </div>
                    <div className={styles.videowrapper}>
                        <iframe title="History of Audiovisual Explorations" src="https://player.vimeo.com/video/110130383" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                    </div>
                    <div className={styles.info}>
                        <p>Presenting my PhD research into the history of humanities explorations into creating synaesthetic relationships between sound and image. Covering approaches from Isaac Newton up until the present day.</p>
                    </div>
                </div>

                
            </main>

        </Layout>
    )
}

export default PresentationsPage