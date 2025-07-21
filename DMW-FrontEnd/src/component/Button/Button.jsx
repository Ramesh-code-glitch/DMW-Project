"use client";
import React from "react";

const Button = ({
  width = "17rem",
  height = "5.5rem",
  color = "#FFFFFF",
  fontSize = "1.6rem",
  cursor = "pointer",
  fontFamily = "Inter",
  fontWeight = "500",
  text = "Proceed",
  background = "#74DBFB",
  borderRadius = "1rem",
  lineHeight = "2.42rem",
  textDecoration = "none",
  letterSpacing = "0.04em",
  border = "0.1rem solid #74DBFB",
  alignItems = "center",
  justifyContent = "center",
  display = "flex",
  event = () => { },
}) => {
  return (
    <button
      type="submit"
      className="btn"
      style={{
        width: width,
        height: height,
        color: color,
        cursor: cursor,
        border: border,
        fontSize: fontSize,
        background: background,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        lineHeight: lineHeight,
        letterSpacing: letterSpacing,
        textDecoration: textDecoration,
        text: text,
        alignItems: alignItems,
        justifyContent: justifyContent,
        display: display,
        borderRadius: borderRadius,
      }}
      onClick={event}
    >
      <p>{text}</p>
    </button>
  );
};

export default Button;