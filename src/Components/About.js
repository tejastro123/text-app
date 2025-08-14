// import React, { useState } from "react";

export default function About(props) {
  // const [isDarkMode, setIsDarkMode] = useState(false);

  // const [mystyle, setmystyle] = useState({
  //   color: "black",
  //   backgroundColor: "white",
  // })

  let mystyle = {
    color: props.mode ==='dark'? 'white' : 'black',
    backgroundColor: props.mode ==='dark'? '#363233' : 'white',
  }

  // const toggleStyle = () => {
  //   setIsDarkMode((prevMode) => !prevMode);
  // };

  const accordionItems = [
    {
      id: "collapseOne",
      title: "Accordion Item #1",
      content:
        "This is the first item's accordion body. Its shown by default..."
    },
    {
      id: "collapseTwo",
      title: "Accordion Item #2",
      content:
        "This is the second item's accordion body. It is hidden by default..."
    },
    {
      id: "collapseThree",
      title: "Accordion Item #3",
      content:
        "This is the third item's accordion body. It is hidden by default..."
    },
  ];

  return (
    // <div className={`container py-3 ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
    <div className="container" style={{mystyle, border: props.mode ==='dark'? "2px solid white" : "2px solid black", borderRadius: "10px"}}>
      <h1 className="my-3">About Us</h1>

      <div className="accordion" id="accordionExample">
        {accordionItems.map((item, index) => (
          <div className="accordion-item" key={index} style={mystyle}>
            <h2 className="accordion-header">
              <button
                // className={`accordion-button ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"} ${index !== 0 ? "collapsed" : ""}`}
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${item.id}`}
                aria-expanded={index === 0}
                aria-controls={item.id}
                style={mystyle}
              >
                <strong>{item.title}</strong>
              </button>
            </h2>
            <div
              id={item.id}
              className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
              data-bs-parent="#accordionExample"
            >
              {/* <div className={`accordion-body ${isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}`}> */}
              <div className="accordion-body" style={mystyle}>
                {item.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-3">
        <button
          onClick={toggleStyle}
          type="button"
          className="btn btn-primary"
        >
          {isDarkMode ? "Enable Light Mode" : "Enable Dark Mode"}
        </button>
      </div> */}
      <br></br>
    </div>
  );
}
