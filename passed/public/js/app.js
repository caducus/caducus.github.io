// document on load

$(() => {
  // array containing the names of the rotations
  const rotationsArray = ["-- select --", "Family Medicine", "Emergency Medicine", "Internal Medicine", "Surgery", "Women's Health", "Pediatrics", "Psychiatry"];

  const preceptorArray = ["-- select --", "Dr. Acula", "Dr. Busybody", "Dr. Fussalot", "Dr. OldFuddy", "Dr. Pepper"];

  // array of objects containing the skills of each rotation
  const rotationSkills = {
    rotation1: ["-- select --", "Perform injections", "Perform throat swab", "Perform venipuncture", "Perform age-appropriate well-child history & physical exam", "Perform pelvic exam to include speculum exam", "Perform mental status exam"],
    rotation2: ["-- select --", "Create and apply splint", "Administer local anesthesia", "Perform incision and drainage of abscess", "Use universal precautions & Sterile procedures", "Perform injections", "Perform throat swab", "Perform venipuncture", "Perform IV catheterization", "Perform urinary catheter insertion & removal", "Perform wound closure & care", "Perform pelvic exam to include speculum exam", "Perform mental status exam"],
    rotation3: ["-- select --", "Perform injections", "Perform throat swab", "Perform IV catheterization", "Perform mental status exam"],
    rotation4: ["-- select --", "Use universal precautions & Sterile procedures", "Perform IV catheterization", "Assist in surgical procedures", "Perform urinary catheter insertion & removal", "Perform wound closure & care"],
    rotation5: ["-- select --", "Perform urinary catheter insertion & removal", "Perform wound closure & care", "Perform pelvic exam to include speculum exam", "Perform prenatal exam to include fundal height measurement & fetal heart tone"],
    rotation6: ["-- select --", "Perform injections", "Perform throat swab", "Perform age-appropriate well-child history & physical exam"],
    rotation7: ["-- select --", "Perform mental status exam"]
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
    $optionElement.attr("id", "rotation" + [i])
    $optionElement.val(rotationsArray[i]);
    $optionElement.text(rotationsArray[i]);
    $rotationList.append($optionElement);
  };

  // create the first empty "select" item in the preceptorList
  $pOptionElement = $("<option>");
  $pOptionElement.text(preceptorArray[0]);
  $preceptorList.append($pOptionElement);

  // list the options in preceptorList upon load
  for (let i = 1; i < preceptorArray.length; i++) {
    $optionElement = $("<option>");
    $optionElement.val(preceptorArray[i]);
    $optionElement.text(preceptorArray[i]);
    $preceptorList.append($optionElement);
  };

  // function to populate the Skill List upon selection of item from Rotation List
  const getSkillList = () => {
    // empty the skill list
    $skillList.empty();

    // select the current value of the rotation list
    let rotationSelectedValue = $rotationList.children(":selected").attr("id");

    // save the array of skills that corrosponds with current value of the rotation list
    let skillArray = rotationSkills[rotationSelectedValue];

    // create the first empty "select" item in the list
    $skillElement0 = $("<option>");
    $skillElement0.text(skillArray[0]);
    $skillList.append($skillElement0);

    // populate the data from the skillArray into the second list
    for (let i = 1; i < skillArray.length; i++) {
      $skillElement = $("<option>");
      $skillElement.val(skillArray[i]);
      $skillElement.text(skillArray[i]);
      $skillList.append($skillElement);
    };

  };

  // event listener
  $rotationList.on("change", getSkillList);
});
