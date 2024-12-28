import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import "./game-info.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const GameInfoTemplate = ({ data }) => {
  const project = data.allProjectsJson.nodes[0];

  const carouselSettings = {
    infinite: true,
    autoPlay: true,
    autoPlaySpeed: 3000,
    arrows: true,
    slidesToSlide: 1,
    responsive: {
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    },
  };

  const mediaContent = [
    ...(project.youtubeEmbed
      ? [
        <iframe
          key="youtube"
          src={project.youtubeEmbed}
          title="YouTube Video"
          style={{
            border: "none",
            width: "100%",
            maxWidth: "800px",
            aspectRatio: "16 / 9",
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>,
      ]
      : []),
    ...(project.screenshots
      ? project.screenshots.map((src, idx) => (
        <img key={`screenshot-${idx}`} src={src} alt={`${project.name} screenshot ${idx + 1}`} />
      ))
      : []),
  ];

  return (
    <Layout>
      <div className="game-info-page">
        <h1>{project.name}</h1>
        <p className="date">{project.date}</p>

        {/* Carousel for Media */}
        {mediaContent.length > 0 && (
          <div className="media-carousel">
            <Carousel {...carouselSettings}>
              {mediaContent.map((item, index) => (
                <div key={index} className="carousel-item">
                  {item}
                </div>
              ))}
            </Carousel>
          </div>
        )}

        {/* Description */}
        {project.description && (
          <div className="description">
            <p>{project.description}</p>
          </div>
        )}

        {/* Steam Embed */}
        {project.steamLink && (
          <div className="embed steam-embed">
            <a
              href={project.steamLink}
              target="_blank"
              rel="noopener noreferrer"
              className="steam-badge"
            >
              <img
                src="https://i0.wp.com/abyteentertainment.com/wp-content/uploads/2019/01/steambadge.png?resize=300%2C89&ssl=1"
                alt="Available on Steam"
                className="steam-badge-image"
              />
            </a>
          </div>
        )}

        {/* Itch.io Embed */}
        {project.itchEmbed && (
          <div className="embed itch-embed">
            <iframe
              src={project.itchEmbed}
              title="Itch.io Game"
              style={{
                border: "1px solid #14A76C",
                width: "100%",
                maxWidth: "554px",
                height: "169px",
              }}
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* GitHub Embed */}
        {project.githubLink && (
          <div className="embed github-embed">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="github-badge"
            >
              <img
                src="https://badgen.net/badge/Available%20on/GitHub/black?icon=github"
                alt="Available on GitHub"
                className="github-badge-image"
              />
            </a>
          </div>
        )}

        {/* Playtore Embed */}
        {project.playstoreLink && (
          <div className="embed playstore-embed">
            <a
              href={project.playstoreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="playstore-badge"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play Badge"
                className="playstore-badge-image"
              />
            </a>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    allProjectsJson(filter: { slug: { eq: $slug } }) {
      nodes {
        name
        date
        description
        youtubeEmbed
        itchEmbed
        steamLink
        githubLink
        playstoreLink
        screenshots
      }
    }
  }
`;

export default GameInfoTemplate;
