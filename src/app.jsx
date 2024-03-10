import { useState, useEffect } from "preact/hooks";

import "./app.css";

export function App() {
  const [config, setConfig] = useState([]);

  useEffect(() => {
    fetch("/config.json")
      .then((response) => response.json())
      .then((data) => setConfig(data));

    if (config.title) {
      document.title = config.title;
    }
  }, []);

  const { title, description, sections } = config;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">{title || "TinyHub"}</h1>
        {description && <p className="description">{description}</p>}
      </header>
      <div className="categories">
        {sections &&
          sections.map((section) => (
            <div className="category">
              <h2 className="category-title">{section.name}</h2>
              <ul className="services">
                {section.services.map((service) => (
                  <li>
                    <a href={service.uri} className="service">
                      <div
                        className={
                          service.iconAspect == "full"
                            ? "icon-container full"
                            : "icon-container"
                        }
                      >
                        {service.icon ? (
                          <img
                            className="icon"
                            src={service.icon}
                            alt={service.name}
                          />
                        ) : (
                          <span className="letter">{service.name[0]}</span>
                        )}
                      </div>
                      <div className="service-name">
                        <strong>{service.name}</strong>
                        <br />
                        <span>{service.description}</span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
      <footer className="footer">
        <p>
          <a href="https://github.com/vermotr/tinyhub">TinyHub</a> - v0.1.0
        </p>
      </footer>
    </div>
  );
}
