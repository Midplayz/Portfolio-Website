import React, { useState, useEffect, useRef } from "react";
import { graphql } from "gatsby";
import "./game-info.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const GameInfoTemplate = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [isYouTubeApiReady, setIsYouTubeApiReady] = useState(false);
  const carouselRef = useRef(null);

  const project =
    data.allProjectsJson.nodes[0] || data.allOthersJson.nodes[0];

  useEffect(() => {
    if (!window.YT) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        setIsYouTubeApiReady(true);
      };

      return () => {
        document.body.removeChild(script);
      };
    } else {
      setIsYouTubeApiReady(true);
    }
  }, []);

  if (!project) {
    return <p>Project not found.</p>;
  }

  const carouselSettings = {
    infinite: true,
    autoPlay: autoPlay,
    autoPlaySpeed: 3000,
    arrows: true,
    slidesToSlide: 1,
    responsive: {
      desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
      tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
      mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    },
    afterChange: (currentSlideIndex) => {
      setCurrentSlide(currentSlideIndex);
    },
  };

  const mediaContent = [
    ...(project.youtubeEmbed
      ? [
          <iframe
            key="youtube"
            src={`${project.youtubeEmbed}?enablejsapi=1&autoplay=1`}
            title="YouTube Video"
            style={{
              border: "none",
              width: "100%",
              maxWidth: "800px",
              aspectRatio: "16 / 9",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            ref={(iframe) => {
              if (iframe && currentSlide === 0 && isYouTubeApiReady) {
                setupYouTubeEvents(iframe);
              }
            }}
          ></iframe>,
        ]
      : []),
    ...(project.screenshots
      ? project.screenshots.map((src, idx) => (
          <img
            key={`screenshot-${idx}`}
            src={src}
            alt={`${project.name} screenshot ${idx + 1}`}
            onLoad={() => setAutoPlay(true)}
          />
        ))
      : []),
  ];

  const setupYouTubeEvents = (iframe) => {
    new window.YT.Player(iframe, {
      events: {
        onStateChange: (event) => {
          if (event.data === 1) {
            setAutoPlay(false);
          } else if (event.data === 0) {
            carouselRef.current.goToSlide(currentSlide + 1);
            setAutoPlay(true);
          }
        },
      },
    });
  };  

  return (
    <div className="game-info-page">
      <h1>{project.name}</h1>
      <p className="date">{project.date}</p>

      {mediaContent.length > 0 && (
        <div className="media-carousel">
          <Carousel ref={carouselRef} {...carouselSettings}>
            {mediaContent.map((item, index) => (
              <div key={index} className="carousel-item">
                {item}
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {project.description && (
        <div className="description">
          <p>{project.description}</p>
        </div>
      )}

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

{project.buttonText && project.buttonUrl && (
  <div className="custom-button-container">
    <a
      href={project.buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="custom-button"
    >
      {project.buttonText}
    </a>
  </div>
)}
    </div>
  );
};

export const query = graphql`
  query ($slug: String!) {
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
        buttonText
        buttonUrl
      }
    }
    allOthersJson(filter: { slug: { eq: $slug } }) {
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
        buttonText
        buttonUrl
      }
    }
  }
`;

export default GameInfoTemplate;
