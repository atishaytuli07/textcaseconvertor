document.addEventListener("DOMContentLoaded", () => {
  const buttons = {
    upperCaseButton: (text) => text.toUpperCase(),
    lowerCaseButton: (text) => text.toLowerCase(),
    titleCaseButton: toTitleCase,
    sentenceCaseButton: toSentenceCase,
    alternatingCaseButton: toAlternatingCase,
    removeextraspace: removeExtraSpaces,
    removeHtmlButton: removeHtmlTags,
    removeSpecialCharButton: removeSpecialCharacters,
    calculateTextStatisticsButton: calculateTextStatistics,
    findAndReplaceButton: findAndReplace,
    saveTextToFileButton: saveTextToFile,
    loadTextFromFileButton: loadTextFromFile,
    encodeToBase64Button: encodeToBase64,
    decodeFromBase64Button: decodeFromBase64,
  };

  const inputText = document.getElementById("inputText");
  const outputText = document.getElementById("outputText");
  const wordCountSpan = document.getElementById("wordCount");
  const charCountSpan = document.getElementById("charCount");
  const fileInput = document.getElementById("fileInput");

  Object.keys(buttons).forEach((id) => {
    const button = document.getElementById(id);
    if (button) {
      button.addEventListener("click", () => {
        const newText = buttons[id](inputText.value);
        if (
          id !== "calculateTextStatisticsButton" &&
          id !== "findAndReplaceButton"
        ) {
          outputText.value = newText;
          if (id === "clearButton") {
            inputText.value = "";
            outputText.value = "";
          }
          updateCounts(newText);
        }
      });
    }
  });

  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.value).then(() => {
      showCopyConfirmation();
    });
  });

  function showCopyConfirmation() {
    const confirmation = document.createElement("div");
    confirmation.textContent = "Text Copied!";
    confirmation.style.position = "absolute";
    confirmation.style.bottom = "17px";
    confirmation.style.right = "32%";
    confirmation.style.backgroundColor = "hsl(49, 100%, 53%)";
    confirmation.style.color = "#fff";
    confirmation.style.padding = "2px 7px";
    confirmation.style.borderRadius = "25px";
    confirmation.style.border = "1.5px solid black";
    document.body.appendChild(confirmation);
    setTimeout(() => {
      document.body.removeChild(confirmation);
    }, 1000);
  }

  function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }

  function toSentenceCase(str) {
    return str
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (txt) => txt.toUpperCase());
  }

  function toAlternatingCase(str) {
    return str
      .split("")
      .map((char, index) =>
        index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
      )
      .join("");
  }

  function removeExtraSpaces(str) {
    return str.replace(/\s+/g, " ").trim();
  }

  function removeHtmlTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }

  function removeSpecialCharacters(str) {
    return str.replace(/[^\w\s]/gi, "");
  }

  function calculateTextStatistics(str) {
    const words = countWords(str);
    const characters = str.length;
    const sentences = str.split(/[.!?]+/).filter(Boolean).length;
    const paragraphs = str.split(/\n\n+/).filter(Boolean).length;
    const avgWordLength = (str.length / words).toFixed(2);
    const readingTime = (words / 200).toFixed(2);

    outputText.value = `Sentences: ${sentences}\nParagraphs: ${paragraphs}\nAverage Word Length: ${avgWordLength}\nEstimated Reading Time: ${readingTime} minutes \n\nthanks for using @tcc !\n\n\n`;
    return str;
  }

  function findAndReplace(str) {
    const findText = prompt("Enter the text to find:");
    const replaceText = prompt("Enter the replacement text:");
    if (findText !== null && replaceText !== null) {
      const result = str.split(findText).join(replaceText);
      if (str === result) {
        outputText.value = "No occurrences found or no change made";
      } else {
        outputText.value = result;
      }
      updateCounts(result);
      return result;
    }
    return str;
  }

  function saveTextToFile() {
    const blob = new Blob([outputText.value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tcc.txt";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      outputText.value = "File saved";
      document.body.removeChild(a);
    }, 100);
  }

  function loadTextFromFile() {
    fileInput.click();
  }

  function handleFileLoad(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        inputText.value = e.target.result;
        updateCounts(e.target.result);
        outputText.value = "File loaded";
      };
      reader.readAsText(file);
    }
  }

  function encodeToBase64(str) {
    return btoa(unescape(encodeURIComponent(str)));
  }

  function decodeFromBase64(str) {
    return decodeURIComponent(escape(atob(str)));
  }

  function updateCounts(text) {
    wordCountSpan.textContent = countWords(text);
    charCountSpan.textContent = text.length;
  }

  function countWords(str) {
    str = str.trim();
    return str ? str.split(/\s+/).length : 0;
  }

  let htu = document.querySelector(".htu");
  htu.addEventListener("click", function () {
    window.location.href = "htu.html";
  });

  fileInput.addEventListener("change", handleFileLoad);

  document.getElementById("clearButton").addEventListener("click", () => {
    inputText.value = "";
    outputText.value = "";
  });
});
