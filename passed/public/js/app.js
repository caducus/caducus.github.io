// document on load

$(() => {
  // array containing the names of the rotations
  const rotationsArray = ["-- select --", "Rotation", "Rotation 2", "Rotation 3", "Rotation 4"];

  const preceptorArray = ["-- select --", "Dr. Busybody", "Dr. OldFuddy", "Dr. Fussalot", "Dr. Pepper"];

  // array of objects containing the skills of each rotation
  const rotationSkills = {
    rotation1: ["-- select --", "Skill 101", "Skill 102", "Skill 103", "Skill 104"],
    rotation2: ["-- select --", "Skill 201", "Skill 202", "Skill 203", "Skill 204"],
    rotation3: ["-- select --", "Skill 301", "Skill 302", "Skill 303", "Skill 304"],
    rotation4: ["-- select --", "Skill 401", "Skill 402", "Skill 403", "Skill 404"]
  };

  // grab list element from the dom
  const $rotationList = $("#rotation-list");
  const $preceptorList = $("#preceptor-list");
  const $skillList = $("#skill-list");

  // create the first empty "select" item in the rotationList
  $rOptionElement = $("<option>");
  $rOptionElement.text(rotationsArray[0]);
  $rotationList.append($rOptionElement);

  // list the options in rotationList upon load
  for (let i = 1; i < rotationsArray.length; i++) {
    $optionElement = $("<option>");
    $optionElement.val("rotation" + [i]);
    $optionElement.text(rotationsArray[i]);
    $rotationList.append($optionElement);
  };

  // create the first empty "select" item in the preceptorList
  $pOptionElement = $("<option>");
  $pOptionElement.text(preceptorArray[0]);
  $preceptorList.append($pOptionElement);

  // list the options in preceptorList upon load
  for (let i = 1; i < rotationsArray.length; i++) {
    $optionElement = $("<option>");
    $optionElement.val("preceptor" + [i]);
    $optionElement.text(preceptorArray[i]);
    $preceptorList.append($optionElement);
  };

  // function to populate the Skill List upon selection of item from Rotation List
  const getSkillList = () => {
    // empty the skill list
    $skillList.empty();

    // select the current value of the rotation list
    let rotationSelectedValue = $rotationList.val();

    // save the array of skills that corrosponds with current value of the rotation list
    let skillArray = rotationSkills[rotationSelectedValue];

    // create the first empty "select" item in the list
    $skillElement0 = $("<option>");
    $skillElement0.text(skillArray[0]);
    $skillList.append($skillElement0);

    // populate the data from the skillArray into the second list
    for (let i = 1; i < rotationsArray.length; i++) {
      $skillElement = $("<option>");
      $skillElement.val("skill" + [i]);
      $skillElement.text(skillArray[i]);
      $skillList.append($skillElement);
    };

  };

  // event listener
  $rotationList.on("change", getSkillList);
});
