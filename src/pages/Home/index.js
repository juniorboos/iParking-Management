import React, { useRef } from "react";
import "./styles.css";

import logo from "../../assets/logo.svg";
import iphoneHome from "../../assets/iphone1.png";
import card1 from "../../assets/card1.svg";
import card2 from "../../assets/card2.svg";
import card3 from "../../assets/card3.svg";
import sectionTitle from "../../assets/sectionTitle.svg";
import aboutScreens from "../../assets/aboutScreens.png";
import featuresScreen from "../../assets/featuresScreen.png";
import requestIcon from "../../assets/requestIcon.svg";
import searchIcon from "../../assets/searchIcon.svg";
import checkIcon from "../../assets/checkIcon.svg";
import profileIcon from "../../assets/profileIcon.svg";
import reservationsIcon from "../../assets/reservationsIcon.svg";
import designIcon from "../../assets/designIcon.svg";
import googleplay from "../../assets/googleplay.png";
import appstore from "../../assets/appstore.png";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const SplitText = (props) => {
  return (
    <span aria-label={props.copy} role="heading">
      {props.copy.split("").map(function (char, index) {
        let style = { animationDelay: 0.5 + index / 10 + "s" };
        return (
          <span aria-hidden="true" key={index} style={style}>
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default function Home() {
  const history = useHistory();
  const dispatch = useDispatch();

  const focusHome = useRef(null);
  const focusAbout = useRef(null);
  const focusFeatures = useRef(null);
  const focusDownload = useRef(null);
  const executeScroll = (route) => {
    scrollToRef(route);
  };

  const enterLogin = () => {
    history.push("/login");
    dispatch({ type: "SHOW_SIDEBAR" });
  };

  return (
    <div className="mainContainer">
      <div className="header">
        <img
          className="logo"
          src={logo}
          alt="iParking logo"
          onClick={() => executeScroll(focusHome)}
        />
        <div className="headerItems">
          <h4 className="headerItem" onClick={() => executeScroll(focusAbout)}>
            About
          </h4>
          <h4
            className="headerItem"
            onClick={() => executeScroll(focusFeatures)}
          >
            Features
          </h4>
          <h4
            className="headerItem"
            onClick={() => executeScroll(focusDownload)}
          >
            Download
          </h4>
          <h4 className="headerItem" onClick={() => enterLogin()}>
            Admin
          </h4>
        </div>
      </div>
      <div className="home" ref={focusHome}>
        <div className="homeItems">
          <div className="iphoneHomeDiv">
            <img
              className="iphoneHome"
              src={iphoneHome}
              alt="Iphone homepage"
            />
          </div>
          {/* <h1 className="homeTitle">a solution for Smart Parkings</h1> */}
          <h1 className="homeTitle">
            <SplitText copy="a solution for Smart Parkings" />
          </h1>
        </div>
      </div>
      <div className="cards">
        <div className="card">
          <img className="cardImage" src={card1} alt="" />
          <div>
            <h3 className="cardTitle">Multi-agent system</h3>
            <p className="cardDescription">Best spot for your needs</p>
          </div>
        </div>
        <div className="card">
          <img className="cardImage" src={card2} alt="" />
          <div>
            <h3 className="cardTitle">Cloud based</h3>
            <p className="cardDescription">Fast and efficient</p>
          </div>
        </div>
        <div className="card">
          <img className="cardImage" src={card3} alt="" />
          <div>
            <h3 className="cardTitle">Easy to use</h3>
            <p className="cardDescription">Very intuitive</p>
          </div>
        </div>
      </div>
      <div className="about" ref={focusAbout}>
        <div className="sectionHeader">
          <h2 className="sectionTitle">About App</h2>
          <img className="sectionSvg" src={sectionTitle} alt="section svg" />
        </div>
        <div className="aboutContent">
          <img
            className="aboutScreens"
            src={aboutScreens}
            alt="iphone screens"
          />
          <div className="aboutText">
            <p>
              Good things happen when technology help people, whether by
              facilitating parking in the city or simply saving drivers time.
              Time is precious, and really is money. What started as a way to
              tap a button to enter a parking spot has led to a integration of
              various functionalities, like requesting spots or even searching
              for available ones with the help of our technology.
            </p>
            <br />
            <br />
            <p>
              Whether you drive a car, motorcycle or even bicycles, iParking
              gives you an easy way to park anywhere without wasting time. Built
              for everyone, it offers simple use of smart parking's resources
              with automated systems.
            </p>
          </div>
        </div>
      </div>
      <div className="features" ref={focusFeatures}>
        <div className="sectionHeader">
          <h2 className="sectionTitle">Features</h2>
          <img className="sectionSvg" src={sectionTitle} alt="section svg" />
        </div>
        <div className="featuresContent">
          <div className="leftContainer">
            <div className="leftFeature">
              <div className="leftFeatureText">
                <h3 className="featureTitle">Request spots</h3>
                <h4 className="featureDescription">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  iumod tempor incididunt
                </h4>
              </div>
              <img
                src={requestIcon}
                alt="request spots icon"
                className="featureIcon"
              />
            </div>
            <div className="leftFeature">
              <div className="leftFeatureText">
                <h3 className="featureTitle">Search parkings</h3>
                <h4 className="featureDescription">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  iumod tempor incididunt
                </h4>
              </div>
              <img
                src={searchIcon}
                alt="search parkings icon"
                className="featureIcon"
              />
            </div>
            <div className="leftFeature">
              <div className="leftFeatureText">
                <h3 className="featureTitle">Request spots</h3>
                <h4 className="featureDescription">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  iumod tempor incididunt
                </h4>
              </div>
              <img
                src={checkIcon}
                alt="check available spots icon"
                className="featureIcon"
              />
            </div>
          </div>
          <img
            className="featuresScreen"
            src={featuresScreen}
            alt="phone login"
          />
          <div className="rightContainer">
            <div className="rightFeature">
              <img
                src={profileIcon}
                alt="profile icon"
                className="featureIcon"
              />
              <div className="rightFeatureText">
                <h3 className="featureTitle">View profile</h3>
                <h4 className="featureDescription">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  iumod tempor incididunt
                </h4>
              </div>
            </div>
            <div className="rightFeature">
              <img
                src={reservationsIcon}
                alt="see reservations icon"
                className="featureIcon"
              />
              <div className="rightFeatureText">
                <h3 className="featureTitle">See reservations</h3>
                <h4 className="featureDescription">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  iumod tempor incididunt
                </h4>
              </div>
            </div>
            <div className="rightFeature">
              <img
                src={designIcon}
                alt="flat design icon"
                className="featureIcon"
              />
              <div className="rightFeatureText">
                <h3 className="featureTitle">Flat design</h3>
                <h4 className="featureDescription">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                  iumod tempor incididunt
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="download" ref={focusDownload}>
        <div className="sectionHeader">
          <h2 className="sectionTitle" style={{ color: "white" }}>
            Download
          </h2>
          <img
            className="sectionSvg"
            style={{
              filter:
                "invert(100%) sepia(0%) saturate(18%) hue-rotate(354deg) brightness(104%) contrast(100%)",
            }}
            src={sectionTitle}
            alt="section svg"
          />
        </div>
        <div className="platforms">
          <img src={googleplay} alt="google play" />
          <img src={appstore} alt="google play" />
        </div>
      </div>
    </div>
  );
}
