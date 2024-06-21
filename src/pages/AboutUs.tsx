import React from 'react'
import { createGlobalStyle } from 'styled-components'
import GlobalStyle from '../styles/GlobalStyle'
import { Link } from 'react-router-dom'

function AboutUs() {

    const AboutUsStyle = createGlobalStyle`
    .about-box {
    font-family: "Manrope", sans-serif;
    margin-top: 7rem;
}

.about-infos {
    font-size: 1.5rem;
}

.about-infos div {
    margin-bottom: 1rem;
}
    `;

    return (
        <>
            <GlobalStyle />
            <AboutUsStyle />

            <div className="genel-box about-box">
                <div className="first-div container">
                    <Link to="/">Todo List</Link>
                </div>
                <div className="container about-infos">
                    <div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas nisi repellat officia nobis. Pariatur vel
                        perferendis laborum corporis temporibus error ab animi ducimus explicabo, impedit atque libero neque
                        cupiditate repellat voluptatem cum earum enim itaque accusantium quidem quasi facere! Sint facilis
                        architecto sequi! Quo minima odit tenetur consequuntur labore natus suscipit animi debitis saepe quis
                        facere excepturi perspiciatis est explicabo, itaque asperiores. Iusto, eius tempore quam illo temporibus
                        sapiente. Id nisi labore odio inventore hic quos suscipit aliquam, perspiciatis, provident quis eum aut
                        eaque reiciendis error, quae nobis iure omnis animi explicabo laborum! Veritatis, adipisci. Ab
                        temporibus iusto beatae totam.
                    </div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum quam ut saepe alias dolores quos
                        officiis rem ipsa doloribus deserunt quis soluta error quasi, fugit laboriosam amet aut odit, veritatis,
                        facilis odio libero ducimus rerum enim. Consequatur sapiente, nostrum inventore molestias rem
                        voluptatibus id dolor asperiores quo accusantium impedit minus!</div>
                    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi nam quae enim autem dignissimos quo
                        doloribus aspernatur perspiciatis. Explicabo, incidunt.</div>
                </div>
            </div>
        </>
    )
}

export default AboutUs