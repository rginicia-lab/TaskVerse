import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <h1>
        Organize Your Work
        <br />
        Achieve More Every Day
      </h1>

      <p>
        A modern task management platform
        that helps you stay productive
        and accomplish your goals.
      </p>

      <div className="hero-buttons">

        <button className="start-btn">
          Get Started
        </button>

        <button className="learn-btn">
          Learn More
        </button>

      </div>

    </section>
  );
}

export default Hero;