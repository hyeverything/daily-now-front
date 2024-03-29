import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    background: "none",
  },
  stepper: {
    borderBottom: "1px solid #e0e0e0",
    display: "flex",
    justifyContent: "center",
  },
});

export interface indexInfo {
  start: number;
  end: number;
}

export interface StepperProps {
  index: indexInfo;
  steps: number;

  handleP2PIndex: (first: number, second: number) => void;
}

export default function Stepper(props: StepperProps) {
  const classes = useStyles();
  const theme = useTheme();

  /**
   * 좌우 이동 관리 state
   */
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    props.handleP2PIndex(props.index.end, props.index.end + 5);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    props.handleP2PIndex(props.index.start - 5, props.index.start);
  };

  return (
    <div className={classes.stepper}>
      <MobileStepper
        variant="dots"
        steps={Math.floor(props.steps)}
        position="static"
        activeStep={activeStep}
        className={classes.root}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === Math.floor(props.steps - 1)}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </div>
  );
}
