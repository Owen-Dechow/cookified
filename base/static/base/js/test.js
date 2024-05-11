var Correct = 0;
var Incorrect = 0;
const TOTAL_NUMBER_OF_QUESTIONS = 30;

async function startQuiz() {
    $(".startquiz-section").css("display", "none");
    setCookie("questions", "", 1);
    await loadNextQuestion();
    $(".question-section").css("display", "");
}


async function loadNextQuestion() {
    let $data = await $.getJSON('/get-question/')
        .fail(function () { alert('request failed'); });

    setCookie("questions", `${getCookie("questions")},${$data["id"]}`, 1);

    $(".question").text($data["question"]);

    let $optionsList = $(".options");
    $optionsList.empty();

    $data["options"].forEach(elem => {
        let $question = $(".option-template").clone();
        $question.css("display", "");
        $question.removeClass("option-template");
        $question.find("input").val(elem[1]);
        $question.find(".option-text").text(elem[0]);
        $question.appendTo($optionsList);
    });

    let total = Correct + Incorrect;

    $(".question-count").text(`Question #${total + 1} of ${TOTAL_NUMBER_OF_QUESTIONS}`);
    if (total == TOTAL_NUMBER_OF_QUESTIONS - 1)
        $(".submit-question").text("Finish Test");
}

async function submitQuestion() {
    let $checked = $(".answer:checked");
    let $button = $(".submit-question");


    $button.attr("disabled", "disabled");
    $button.css("background-color", "var(--red)");
    if ($checked.val() == "true")
        Correct += 1;
    else
        Incorrect += 1;

    adjustCookedMeter();


    if (Correct + Incorrect < TOTAL_NUMBER_OF_QUESTIONS)
        await loadNextQuestion();
    else
        showResultsScreen();

    $button.removeAttr("disabled");
    $button.css("background-color", "var(--green)");
}

function showResultsScreen() {
    $(".question-section").addClass("go-out");
    $(".meter-section").addClass("go-out");
    $(".results-section").css("display", "");

    let $outerPie = $(".outer-pie");

    let cookedPercent = Incorrect / (Correct + Incorrect) * 100;
    $outerPie.css("--cooked-percent", `${cookedPercent}%`);
}

function adjustCookedMeter() {
    let total = Correct + Incorrect;
    let cookedPercent = Incorrect / total * 100;

    $(".cooked-percent").text(Math.round(cookedPercent));
    $(".slide").css("--cooked-percent", `${cookedPercent}%`);
}

function tryAgain() {
    location.reload();
}