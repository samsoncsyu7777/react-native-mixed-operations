import React, { useState, useEffect } from "react";
import {
  Button,
} from 'react-native-paper';
import {
  Text,
  View,
  //ScrollView,
  //Button,
} from "react-native";
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';
import { AlertSnackbar } from "../components/AlertComponents";
import { MyFrame } from "../components/HeadingComponents";
import { MyKeypad } from "../components/KeypadComponents";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from "../styles";
import theme from "../Theme";
import constants from "../Constants";

const breakpoint = constants.breakpoint;

//×÷👍👍🏻
export const FourMixedOperations = ({ languageIndex, topic, learningTool, topicIndex, learningToolIndex }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [severity, setSeverity] = useState("error");
  const [formulaLinesArray, setFormulaLinesArray] = useState([""]);
  const [formulaFocusedIndex, setFormulaFocusedIndex] = useState(0);
  const [answersArray, setAnswersArray] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [maximumOperators, setMaximumOperators] = useState(topicIndex + 3);
  const [acceptDecimal, setAcceptDecimal] = useState(learningToolIndex == 0 ? false : true);
  const [numberOfDecimal, setNumberOfDecimal] = useState(7);
  const timeDelay = 200;

  const formaulaPlaceholder = [
    "輸入算式",
    "输入算式",
    "Enter formula",
    "Entrez la formule"
  ];

  const topics = [
    "四則混合計算",
    "四则混合计算",
    "Four Mixed Operations",
    "Quatre Opérations Mixtes"
  ];

  const resultBeValidHint = [
    "這計算結果不是一個正整數。",
    "这计算结果不是一个正整数。",
    "The result of this calculation is not a positive integer.",
    "Le résultat de ce calcul n'est pas un entier positif.",
    "這計算結果是一個循環小數或負數。",
    "这计算结果是一个循环小数或负数。",
    "The result of this calculation is a circulating decimal or a negative number.",
    "Le résultat de ce calcul est un nombre décimal en circulation ou un nombre négatif.",
  ];

  const wellDone = [
    "你做得到﹗你完成了這題混合計算﹗",
    "你做得到﹗你完成了这题混合计算﹗",
    "You can do it! You have completed this mixed calculation!",
    "Vous pouvez le faire! Vous avez terminé ce calcul mixte!"
  ];

  const numberOfOperatorsHintLeft = [
    "最少一步計算，最多",
    "最少一步计算，最多",
    "Minimum 1 operator, maximum ",
    "Minimum 1 opérateur, maximum "
  ];

  const numberOfOperatorsHintRight = [
    "步計算。",
    "步计算。",
    " operators.",
    " opérateurs."
  ];

  const multiplyDivideFirstHintLeft = [
    "首先計算",
    "首先计算",
    "Calculate ",
    "Calculez "
  ];

  const multiplyDivideFirstHintRight = [
    "，因為乘法或除法應在加法或減法之前計算。",
    "，因为乘法或除法应在加法或减法之前计算。",
    " first because multiplication or division should be calculated before addition or subtraction.",
    " d'abord parce que la multiplication ou la division doit être calculée avant l'addition ou la soustraction."
  ];

  const exchangeToAvoidNegativeHint = [
    "避免那減法得到一個負數。",
    "避免那减法得到一个负数。",
    " to avoid the subtraction getting a negative number.",
    " pour éviter que la soustraction n'obtienne un nombre négatif.",
  ];

  const exchangeToAvoidDecimalHint = [
    "避免那除法得到一個小數。",
    "避免那除法得到一个小数。",
    " to avoid the division getting a decimal number.",
    " pour éviter que la division n'obtienne un nombre décimal.",
    "避免那除法得到一個循環小數。",
    "避免那除法得到一个循环小数。",
    " to avoid the division getting a circulating decimal.",
    " pour éviter que la division ne reçoive une décimale en circulation."
  ];

  const orText = [
    "或",
    "或",
    " or ",
    " ou "
  ];

  const calculateFirstHintLeft = [
    "首先計算",
    "首先计算",
    "Calculate ",
    "Calculez d'abord "
  ];

  const calculateFirstHintRight = [
    "。",
    "。",
    " first.",
    "."
  ];

  const subtractGetTensHint = [
    "因為這減法可以得到整十或整百，這使下一步計算變得更容易。",
    "因为这减法可以得到整十或整百，这使下一步计算变得更容易。",
    " because this subtraction can get the whole tens or the whole hundreds, it makes the next calculation easier.",
    " parce que cette soustraction peut obtenir les dizaines entières ou les centaines entières, elle facilite le calcul suivant."
  ];

  const divideGetSmallerHint = [
    "因為這除法可以得到一個較小的數，這使下一步計算變得更容易。",
    "因为这除法可以得到一个较小的数，这使下一步计算变得更容易。",
    " because this division can get a smaller number, which makes the next calculation easier.",
    " parce que cette division peut obtenir un nombre plus petit, ce qui facilite le prochain calcul."
  ];

  const rearrangeHintLeft = [
    "重新排列算式以便先計算",
    "重新排列算式以便先计算",
    "Rearrange the formula to calculate ",
    "Réorganiser la formule pour calculer d'abord "
  ];

  const rearrangeHintRight = [
    "，",
    "，",
    " first ",
    " "
  ];

  useEffect(() => {
    setAcceptDecimal(learningToolIndex == 0 ? false : true);
    resetClick();
  }, [learningToolIndex]);

  useEffect(() => {
    setMaximumOperators(topicIndex + 3);
    resetClick();
  }, [topicIndex])

  const closeAlert = (e) => {
    setOpenAlert(false);
  };

  const resetClick = (e) => {
    setSeverity("error");
    setFormulaLinesArray([""]);
    setFormulaFocusedIndex(0);
    setCompleted(false);
  };

  const okClick = (e) => {
    //check last character is an operator
    var tmpString = formulaLinesArray[formulaFocusedIndex];
    var lastChar = tmpString.slice(tmpString.length - 1);
    if (["+", "-", "×", "÷"].includes(lastChar)) {
      return;
    }
    //replace last formula hints
    var replacedHint = errorMessage.replace(/\*/g, "×");
    replacedHint = replacedHint.replace(/\//g, "÷");
    setErrorMessage(replacedHint);
    //replace this formula
    var replacedString = formulaLinesArray[formulaFocusedIndex].replace(/×/g, "*");
    replacedString = replacedString.replace(/÷/g, "/");

    //first formula
    if (formulaFocusedIndex == 0) {
      //check answer is a positive integer
      var tmpValue = Math.round(eval(replacedString) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
      if (((Number.isInteger(tmpValue) && !acceptDecimal) || (tmpValue.toFixed(numberOfDecimal) == tmpValue && acceptDecimal)) && tmpValue >= 0) {
        nextStepPreparation(replacedString);
      } else {
        //not a positive integer
        setErrorMessage(resultBeValidHint[learningToolIndex * 4 + languageIndex]);
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
      }
    } else {
      //other steps or answer
      //correct steps 

      var correctStep = false;
      var i;
      for (i = 0; i < answersArray.length; i++) {
        if (answersArray[i] == replacedString) {
          correctStep = true;
        }
      }
      if (correctStep) {
        if (replacedString.includes("+") || replacedString.includes("-") || replacedString.includes("*") || replacedString.includes("/")) {
          nextStepPreparation(replacedString);
        } else {
          setErrorMessage("👍🏻" + wellDone[languageIndex]);
          setFormulaFocusedIndex(formulaFocusedIndex + 1);
          setCompleted(true);
          setSeverity("success");
          setTimeout(() => {
            setOpenAlert(true);
          }, timeDelay);
        }
      } else {
        //wrong steps
        setTimeout(() => {
          setOpenAlert(true);
        }, timeDelay);
      }
    }
  };

  function nextStepPreparation(replacedString) {
    var tmpAnswersArray = generateAnswersArray(replacedString);
    //formula cannot generate next step
    if (!tmpAnswersArray[0]) {
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
    } else {
      //formula can generate next step
      setAnswersArray(tmpAnswersArray);
      var tmpFormulaLinesArray = [...formulaLinesArray];
      tmpFormulaLinesArray.push("");
      setFormulaLinesArray(tmpFormulaLinesArray);
      setFormulaFocusedIndex(formulaFocusedIndex + 1);
    }
  }

  function generateAnswersArray(replacedString) {
    //create operatorsStringArray and operatorsIndexArray
    const { operatorsStringArray, operatorsIndexArray } = createIndexArrays(replacedString);
    var thisAnswersArray = [];//["3+4*2", "4*2+3"]

    //check no more than 3 operators
    if (operatorsStringArray.length > maximumOperators || operatorsIndexArray.length == 0) {
      setErrorMessage(numberOfOperatorsHintLeft[languageIndex] + maximumOperators + numberOfOperatorsHintRight[languageIndex]);
      setTimeout(() => {
        setOpenAlert(true);
      }, timeDelay);
      return [false];
    } else {
      //go to generate answers array
      //check it has + or -
      if (operatorsStringArray.includes("+") || operatorsStringArray.includes("-")) {
        //check it is mixed
        if (operatorsStringArray.includes("*") || operatorsStringArray.includes("/")) {
          thisAnswersArray = fourMixedFunction(replacedString, operatorsStringArray, operatorsIndexArray);
        } else {
          //it has + and - only
          thisAnswersArray = addSubtract(replacedString, operatorsStringArray, operatorsIndexArray);
        }
      } else {
        //it has * and / only
        thisAnswersArray = multiplyDivide(replacedString, operatorsStringArray, operatorsIndexArray);
      }
      return thisAnswersArray;
    }

  }

  function fourMixedFunction(replacedString, getOperatorsStringArray, getOperatorsIndexArray) {
    var thisAnswersArray = [];
    var previousIndex = -1;
    var pushedOperatorsStringArray = getOperatorsStringArray;
    //for the case of chain * and / at the end
    pushedOperatorsStringArray.push("+");
    var i;
    var firstHint = true;
    var firstHintText = "";
    for (i = 0; i < pushedOperatorsStringArray.length; i++) {
      if (["+", "-"].includes(pushedOperatorsStringArray[i])) {
        //check there is chain * and /
        if (i - previousIndex > 2) {
          firstHint = false;
          var startString = replacedString.substring(0, getOperatorsIndexArray[previousIndex + 1] + 1);
          var operationsString = replacedString.substring(getOperatorsIndexArray[previousIndex + 1] + 1, getOperatorsIndexArray[i + 1]);
          var endString = replacedString.substring(getOperatorsIndexArray[i + 1]);
          const { operatorsStringArray, operatorsIndexArray } = createIndexArrays(operationsString);
          var tmpAnswersArray = multiplyDivide(operationsString, operatorsStringArray, operatorsIndexArray);
          var j;
          for (j = 0; j < tmpAnswersArray.length; j++) {
            tmpAnswersArray[j] = startString + tmpAnswersArray[j] + endString;
            thisAnswersArray.push(tmpAnswersArray[j]);
          }
        }

        //not a chain also a valid answer
        else {
          //check there is one * or /
          if (i - previousIndex == 2) {
            var tmpHintString = "";
            const { tmpAnswer, tmpHint } = getAnswerString(replacedString, getOperatorsIndexArray, i - 1, i - 1);
            if (tmpAnswer == false) {
              thisAnswersArray = [tmpAnswer];
              firstHintText = tmpHint;
              i = pushedOperatorsStringArray.length;
            } else {
              tmpHintString += (tmpHintString == "" ? "" : orText[languageIndex]) + tmpHint;
              thisAnswersArray.push(tmpAnswer);
              tmpHintString = multiplyDivideFirstHintLeft[languageIndex] + tmpHintString + multiplyDivideFirstHintRight[languageIndex];
              if (firstHint) {
                firstHintText = tmpHintString;
                firstHint = false;
              }
            }
          }
        }
        previousIndex = i;
      }
    }
    if (firstHintText != "") {
      setErrorMessage(firstHintText);
    }
    return thisAnswersArray;
  }

  function addSubtract(replacedString, operatorsStringArray, operatorsIndexArray) {
    var thisAnswersArray = [];
    var thisHints = "";
    if (operatorsStringArray[0] == "-") {
      //check first "-" gets negative number
      if (eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) < 0) {
        //one exchange
        var i;
        var firstHint = true;
        for (i = 1; i < operatorsStringArray.length; i++) {
          if (operatorsStringArray[i] == "+") {
            const { tmpAnswer, tmpHint } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, i);
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              setErrorMessage(tmpHint + exchangeToAvoidNegativeHint[languageIndex]);
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "-"
        const { tmpAnswer, tmpHint } = getAnswerString(replacedString, operatorsIndexArray, 0, 0);
        setErrorMessage(calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex]);
        thisAnswersArray.push(tmpAnswer);
        return [thisAnswersArray];
      }
    } else {
      //check subtract to tens or hundreds
      var j;
      var firstHint = true;
      for (j = 1; j < operatorsStringArray.length; j++) {
        if (operatorsStringArray[j] == "-") {
          var { tmpAnswer, tmpHint } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, j);
          var tmpOperationString = tmpAnswer.substring(0, tmpAnswer.indexOf("+"));
          var tmpNumber = eval(tmpOperationString);
          //check result is tens or hundreds
          if ((tmpNumber >= 0 && tmpNumber < 100 && tmpNumber % 10 == 0) || (tmpNumber >= 100 && tmpNumber % 100 == 0)) {
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              setErrorMessage(tmpHint + subtractGetTensHint[languageIndex]);
              firstHint = false;
            }
          }
        }
      }
      if (!firstHint) {
        return thisAnswersArray;
      }
      //"+" chain
      var i;
      for (i = 0; i < operatorsStringArray.length; i++) {
        if (operatorsStringArray[i] == "+") {
          const { tmpAnswer, tmpHint } = getAnswerString(replacedString, operatorsIndexArray, 0, i);
          thisAnswersArray.push(tmpAnswer);
          thisHints += (thisHints == "" ? "" : orText[languageIndex]) + tmpHint;
        } else {
          i = operatorsStringArray.length;
        }
      }
      thisHints = calculateFirstHintLeft[languageIndex] + thisHints + calculateFirstHintRight[languageIndex];
      setErrorMessage(thisHints);
      return thisAnswersArray;
    }
  }

  function multiplyDivide(replacedString, operatorsStringArray, operatorsIndexArray) {
    var thisAnswersArray = [];
    var thisHints = "";
    if (operatorsStringArray[0] == "/") {
      //check first "/" gets decimal number
      var tmpValue = Math.round(eval(replacedString.substring(0, operatorsIndexArray[1 + 1])) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
      if ((!Number.isInteger(tmpValue) && !acceptDecimal) || (tmpValue.toFixed(numberOfDecimal) != tmpValue) && acceptDecimal) {
        //one exchange
        var i;
        var firstHint = true;
        for (i = 1; i < operatorsStringArray.length; i++) {
          if (operatorsStringArray[i] == "*") {
            var { tmpAnswer, tmpHint } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, i);
            thisAnswersArray.push(tmpAnswer);
            if (firstHint == true) {
              setErrorMessage(tmpHint + exchangeToAvoidDecimalHint[languageIndex]);
              firstHint = false;
            }
          }
        }
        //more than one exchanges

        return thisAnswersArray;
      } else {
        //next step is calculating the first "/"
        const { tmpAnswer, tmpHint } = getAnswerString(replacedString, operatorsIndexArray, 0, 0);
        setErrorMessage(calculateFirstHintLeft[languageIndex] + tmpHint + calculateFirstHintRight[languageIndex]);
        thisAnswersArray.push(tmpAnswer);
        return thisAnswersArray;
      }
    } else {
      //check division to an integer
      var j;
      var firstHint = true;
      for (j = 1; j < operatorsStringArray.length; j++) {
        if (operatorsStringArray[j] == "/") {
          var { tmpAnswer, tmpHint } = exchange(replacedString, operatorsStringArray, operatorsIndexArray, j);
          var tmpOperationString = tmpAnswer.substring(0, tmpAnswer.indexOf("*"));
          var tmpNumber = Math.round(eval(tmpOperationString) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
          //check result is an integer
          if ((Number.isInteger(tmpNumber) && !acceptDecimal) || (tmpNumber.toFixed(numberOfDecimal) == tmpNumber && acceptDecimal)) {
            thisAnswersArray.push(tmpAnswer);
            if (firstHint) {
              setErrorMessage(tmpHint + divideGetSmallerHint[languageIndex]);
              firstHint = false;
            }
          }
        }
      }
      if (!firstHint) {
        return thisAnswersArray;
      }
      //"*" chain
      var i;
      for (i = 0; i < operatorsStringArray.length; i++) {
        if (operatorsStringArray[i] == "*") {
          const { tmpAnswer, tmpHint } = getAnswerString(replacedString, operatorsIndexArray, 0, i);
          thisAnswersArray.push(tmpAnswer);
          thisHints += (thisHints == "" ? "" : orText[languageIndex]) + tmpHint;
        } else {
          i = operatorsStringArray.length;
        }
      }
      thisHints = calculateFirstHintLeft[languageIndex] + thisHints + calculateFirstHintRight[languageIndex];
      setErrorMessage(thisHints);
      return thisAnswersArray;
    }
  }

  function exchange(replacedString, operatorsStringArray, operatorsIndexArray, index) {
    var startString = replacedString.substring(0, operatorsIndexArray[1]);
    var firstOperation = replacedString.substring(operatorsIndexArray[1], operatorsIndexArray[index + 1]);
    var secondOperation = replacedString.substring(operatorsIndexArray[index + 1], operatorsIndexArray[index + 1 + 1]);
    var endString = replacedString.substring(operatorsIndexArray[index + 1 + 1]);
    var tmpAnswer = startString + secondOperation + firstOperation + endString;
    var tmpHint = rearrangeHintLeft[languageIndex] + startString + secondOperation + rearrangeHintRight[languageIndex];
    //setErrorMessage(tmpHint);
    return { tmpAnswer, tmpHint };
  }

  //calculate the operator at index
  function getAnswerString(replacedString, operatorsIndexArray, startIndex, endIndex) {
    var tmpAnswer = "";
    var tmpHint = "";
    //value from this operator
    var operationString = replacedString.substring(operatorsIndexArray[startIndex + 1 - 1] + 1, operatorsIndexArray[endIndex + 1 + 1]);
    var value = Math.round(eval(operationString) * 10 ** (numberOfDecimal + 2)) / 10 ** (numberOfDecimal + 2);
    if (((Number.isInteger(value) && !acceptDecimal) || (value.toFixed(numberOfDecimal) == value && acceptDecimal)) && value >= 0) {
      //this step is a positive integer
      //set one of possible hints
      tmpHint = operationString;
      var startString = replacedString.substring(0, operatorsIndexArray[startIndex + 1 - 1] + 1);
      var valueString = value.toString();
      var endString = replacedString.substring(operatorsIndexArray[endIndex + 1 + 1]);
      tmpAnswer = startString + valueString + endString;
      return { tmpAnswer, tmpHint };
    } else {
      //this step is not a positive integer
      tmpHint = resultBeValidHint[learningToolIndex * 4 + languageIndex];
      tmpAnswer = false;
      return { tmpAnswer, tmpHint };
    }
  }

  function createIndexArrays(replacedString) {
    var operatorsStringArray = [];//eg.["+","-","-"]
    var operatorsIndexArray = [-1];//eg.[-1,4,6,9]

    //create operatorsStringArray and operatorsIndexArray
    var i;
    for (i = 0; i < replacedString.length; i++) {
      if (["+", "-", "*", "/"].includes(replacedString.slice(i, i + 1))) {
        operatorsStringArray.push(replacedString.slice(i, i + 1));
        operatorsIndexArray.push(i);
      }
    }
    operatorsIndexArray.push(replacedString.length);
    return { operatorsStringArray, operatorsIndexArray };
  }

  const handleKeypadClick = (e, key) => {
    if (formulaFocusedIndex == formulaLinesArray.length - 1) {
      var tmpFormulaLinesArray = [...formulaLinesArray];
      if (key == "<") {
        tmpFormulaLinesArray[formulaFocusedIndex] = tmpFormulaLinesArray[formulaFocusedIndex].slice(0, -1);
      } else {
        var tmpString = tmpFormulaLinesArray[formulaFocusedIndex];
        var lastChar = tmpString.slice(tmpString.length - 1);
        if (!(["+", "-", "×", "÷", ""].includes(lastChar) && ["+", "-", "×", "÷"].includes(key))) {
          tmpFormulaLinesArray[formulaFocusedIndex] += key;
        }
      }
      setFormulaLinesArray(tmpFormulaLinesArray);
    }
  }

  return (
    <MyFrame topic={topics[languageIndex] + ": " + topic} learningTool={learningTool}>
      <View style={styles.centerRow}>
        <View style={styles.formulaColumn}>
          {
            formulaLinesArray.map((formula, index) => {
              return <View key={index} style={[styles.verticalCenterRow, styles.commonPadding]}>
                <Text
                  style={[{ opacity: index == 0 ? 0 : 1 }, styles.formulaLine]}
                >=</Text>
                <View
                  style={[styles.formulaBox,
                  {
                    borderColor: (index == formulaFocusedIndex) ? theme.colors.myMagenta : theme.colors.blue,
                    borderWidth: (index == formulaFocusedIndex) ? 3 : 1
                  }]}
                >
                  <Text style={styles.formulaLine}>
                    {formula == "" ? formaulaPlaceholder[languageIndex] : formula}
                  </Text>
                </View>
                {
                  index == formulaFocusedIndex &&
                  <Button
                    style={styles.okButton}
                    mode="contained"
                    onPress={okClick}
                    color={theme.colors.blue}
                  >
                    <Text style={styles.commonText} >
                    OK
                    </Text>
                  </Button>
                }
                {
                  index == formulaLinesArray.length - 1 && completed &&
                  <Button
                    style={styles.okButton}
                    mode="contained"
                    onPress={resetClick}
                    color={theme.colors.blue}
                  >
                    <MaterialIcons name="forward" color={'white'} size={parseInt(wp2dp('100%') < breakpoint? wp2dp('5%'): wp2dp('2%'))} />
                  </Button>
                }
              </View>
            })
          }
        </View>
      </View>
      <MyKeypad
        handleClick={handleKeypadClick}
        acceptDecimal={acceptDecimal}
      />
      <AlertSnackbar
        open={openAlert}
        closeAlert={closeAlert}
        errorMessage={errorMessage}
        severity={severity}
      />
    </MyFrame>
  );
}
