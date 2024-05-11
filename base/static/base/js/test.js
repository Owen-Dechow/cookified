var Correct = 0;
var Incorrect = 0;
var TotalNumberOfQuestions;

async function startQuiz() {
    $(".startquiz-section").css("display", "none");

    let $info = await $.getJSON(`/${getCookie("test")}/get-test-info/`)
        .fail(() => {
            alert("Failed to load quiz. Please reload page or try again later.");
            return;
        });

    TotalNumberOfQuestions = Math.min(
        $info["totalquestions"],
        parseInt($(".max-questions input").val())
    );

    setCookie("questions", "", 1);
    if (TotalNumberOfQuestions) {
        await loadNextQuestion();
        $(".question-section").css("display", "");
    }
    else {

        alert("Sorry, this test doesn't have any questions yet!");
    }
}

async function loadNextQuestion() {
    let $data = await $.getJSON(`/${getCookie("test")}/get-question/`)
        .fail(() => { alert('Failed to load next question. Please reload the page and or again later.'); });

    setCookie("questions", `${getCookie("questions")},${$data["id"]}`, 1);

    $(".question").prop("mdContent", $data["question"]);

    let $optionsList = $(".options");
    $optionsList.empty();

    $data["options"].forEach(elem => {
        let $question = $(".option-template").clone();
        $question.css("display", "");
        $question.removeClass("option-template");
        $question.find("input").val(elem[1]);
        $question.find(".option-text").prop("mdContent", elem[0]);
        $question.appendTo($optionsList);
    });

    let total = Correct + Incorrect;

    $(".question-count").text(`Question #${total + 1} of ${TotalNumberOfQuestions}`);
    if (total == TotalNumberOfQuestions - 1)
        $(".submit-question").text("Finish Test");
}

async function submitQuestion() {
    let $checked = $(".answer:checked");
    let $button = $(".submit-question");


    $button.attr("disabled", "disabled");
    $button.css("filter", "brightness(50%)");
    if ($checked.val() == "true") {
        $checked.closest("label").css("background-color", "var(--green)");
        Correct += 1;
    }
    else {
        $checked.closest("label").css("background-color", "var(--red)");
        let $correct = $(".answer[value='true']").closest("label");
        $correct.css("background-color", "var(--green)");
        $correct.css("border", "1px solid");
        Incorrect += 1;
    }

    adjustCookedMeter();

    setTimeout(async () => {
        if (Correct + Incorrect < TotalNumberOfQuestions) {

            await loadNextQuestion();
            $button.removeAttr("disabled");
            $button.css("filter", "");
        }
        else {
            showResultsScreen();
        }

    }, 1000);
}

function showResultsScreen() {
    let $outerPie = $(".outer-pie");
    let cookedPercent = Incorrect / TotalNumberOfQuestions * 100;
    $outerPie.css("--cooked-percent", `${cookedPercent}%`);

    window.setTimeout(() => {
        $(".question-section").css("display", "none");
        $(".meter-section").css("display", "none");
        $(".results-section").css("display", "");
    }, 1000);
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