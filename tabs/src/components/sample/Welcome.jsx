import React, { useState } from "react";
import { Image, Menu, Popup, Input, Button } from "@fluentui/react-northstar";
import "./Welcome.css";
import { EditCode } from "./EditCode";
import { Deploy } from "./Deploy";
import { Publish } from "./Publish";
import { AddSSO } from "./AddSSO";

export function Welcome(props) {
  const { environment } = {
    environment: window.location.hostname === "localhost" ? "local" : "azure",
    ...props,
  };
  const friendlyEnvironmentName =
    {
      local: "local environment",
      azure: "Azure environment",
    }[environment] || "local environment";

  const steps = ["local", "azure", "publish"];
  const friendlyStepsName = {
    local: "1. Build your app locally",
    azure: "2. Provision and Deploy to the Cloud",
    publish: "3. Publish to Teams",
  };
  const [selectedMenuItem, setSelectedMenuItem] = useState("local");
  const [popupOpen, setPopupOpen] = useState(true);
  const [question, setQuestion] = useState("");

  const handleAnswer = () => {
    if (question === "What is the answer?") {
      setPopupOpen(false);
    }
  };

  const items = steps.map((step) => {
    return {
      key: step,
      content: friendlyStepsName[step] || "",
      onClick: () => setSelectedMenuItem(step),
    };
  });

  return (
    <div className="welcome page">
      <div className="narrow page-padding">
        <Image src="hello.png" />
        <h1 className="center">Congratulations!</h1>
        <p className="center">Your app is running in your {friendlyEnvironmentName}</p>
        <Menu defaultActiveIndex={0} items={items} underlined secondary />
        <div className="sections">
          {selectedMenuItem === "local" && (
            <div>
              <EditCode />
              <AddSSO />
            </div>
          )}
          {selectedMenuItem === "azure" && (
            <div>
              <Deploy />
            </div>
          )}
          {selectedMenuItem === "publish" && (
            <div>
              <Publish />
            </div>
          )}
        </div>
        <Popup
          trapFocus
          open={popupOpen}
          onOpenChange={() => setPopupOpen(false)}
          content={
            <div>
              <p>What is the question?</p>
              <Input fluid onChange={(e) => setQuestion(e.target.value)} />
              <Button primary onClick={handleAnswer}>
                Submit
              </Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
