import React from "react";

import { useSelector } from "react-redux";

import { selectTableHeadData, selectTableBodyData } from "../tableSlice";

const ProbabilityNumbersRow = () => {
  const tableHeadData = useSelector(selectTableHeadData);

  const tableBodyData = useSelector(selectTableBodyData);

  let probabilitiesSuma = 0;

  const probabilitySumaList = tableHeadData.map((headCell, index) => {
    let suma = 0;

    //counting probability number for every bodyRow, using credibility, relevance and probability of each hypothesis evidence to count
    tableBodyData.forEach((bodyROw) => {
      if (suma !== undefined) {
        let interSuma = 1;

        //changing probability suma based on compatibility of each evidence with hypothesis
        switch (bodyROw.inputCells[index]) {
          case "C":
            interSuma = 2;
            break;
          case "N":
            interSuma = 1;
            break;
          case "I":
            interSuma = 0;
            break;

          default:
            interSuma = undefined;
            break;
        }

        if (interSuma !== undefined) {
          //changing probability suma based on credibility

          //these probabilties were made by author of this appliation and can be changed in the future
          //as the aplication is tested
          let credibilityNumber = 1;
          switch (bodyROw.credibility) {
            case "high":
              credibilityNumber = 1.2;
              break;
            case "medium":
              credibilityNumber = 1;
              break;
            case "low":
              credibilityNumber = 0.8;
              break;

            default:
              break;
          }

          //changing probability suma based on relevance
          let relevanceNumber = 1;

          //these probabilties were made by author of this appliation and can be changed in the future
          //as the aplication is tested
          switch (bodyROw.relevance) {
            case "high":
              relevanceNumber = 1.2;
              break;
            case "medium":
              relevanceNumber = 1;
              break;
            case "low":
              relevanceNumber = 0.8;
              break;

            default:
              break;
          }

          //getting midpoint between credibility and relevance vaues to change porbability suma number accordingly
          const credibilityRelevanceMidpoint =
            relevanceNumber + credibilityNumber / 2;

          suma += interSuma * credibilityRelevanceMidpoint;
        } else {
          suma = undefined;
        }
      }
    });

    if (suma !== undefined) {
      probabilitiesSuma += suma;
    }

    return suma;
  });

  return (
    <>
      {probabilitySumaList.map((probabilitySuma, index) => {
        if (probabilitySuma !== undefined) {
          const probabilitySumaPercentage =
            (probabilitySuma / probabilitiesSuma) * 100;

          let probabilitySumaPercentageFloored =
            Math.floor(probabilitySumaPercentage * 100) / 100;

          if (isNaN(probabilitySumaPercentageFloored)) {
            probabilitySumaPercentageFloored = 0;
          }

          return (
            <th key={"probailityNumbersRow" + index}>
              {probabilitySumaPercentageFloored + "%"}
            </th>
          );
        } else {
          return <th key={"probailityNumbersRow" + index}>Can't be counted</th>;
        }
      })}
    </>
  );
};

export default ProbabilityNumbersRow;
