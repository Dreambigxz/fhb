$(document).ready(function(){

var current_fs, next_fs, previous_fs; //fieldsets
var opacity;
var current = 1;
var steps = $("fieldset").length;
let formData = {}

let setMethodEle = [`<div class="hide">
  <label class="fieldlabels">Account Name: *</label>
  <div class="mb-5 mb-md-6">
      <input class="n11-bg" name="account_holder"  placeholder="Legal Name" type="text" value='USDT'>
  </div>
</div>
<div class="hide">
  <label class="fieldlabels">Bank Name: *</label>
  <div class="mb-5 mb-md-6">
      <input class="n11-bg" name="bank_name"  placeholder="Bank" type="text" value='USDTTRC20'>
  </div>
</div>`,`<div class="">
  <label class="fieldlabels">Account Name: *</label>
  <div class="mb-5 mb-md-6">
      <input class="n11-bg" name="account_holder"  placeholder="Legal Name" type="text">
  </div>
</div>
<div class="">
  <label class="fieldlabels">Bank Name: *</label>
  <div class="mb-5 mb-md-6">
      <input class="n11-bg" name="bank_name"  placeholder="Bank" type="text">
  </div>
</div>`]
setProgressBar(current);

function validateForm(form) {
  let header = $(form).attr('class')
  formData[header]={}
  let [fields,input,select,textArea,isValid]=[
      {},
      $(form).find('input'),
      $(form).find('select'),
      $(form).find('textarea'),
      [true]
  ];
  $(input).each(function (e) {
    if ($(this).attr('type')!=='button') {
      if ($(this).val()) {
        formData[header][$(this).attr('name')]=$(this).val()
      }else {isValid.push(false)}
    }
  })
  $(select).each(function (e) {
    let selectedOption = $(this).find(":selected").val()
    if (selectedOption&&selectedOption!=='select') {
      formData[header][$(this).attr('name')]=$(this).find(":selected").val()
    }else {isValid.push(false)}
  })
  if (!Object.keys(formData[header])[0]) {delete(formData[header])}
  return !isValid.includes(false)
}
$(".next").click(function(){

  current_fs = $(this).parent();
  $('.display__error').fadeOut()
  if (!validateForm(current_fs)) {
    $('.display__error').text('Please make sure all field are filled correctly.')
    $('.display__error').fadeIn();
    document.querySelector('#msform').scrollIntoView({ behavior: "smooth", });
    return
  };

  next_fs = $(this).parent().next();

  if ($(next_fs).attr('class')=='withdrawal-address') {
    let selectedMethod=formData['method']['select']
    if (selectedMethod==='USD') {
      $(next_fs).find('.others').html(setMethodEle[0])
      $(next_fs).find('input.address').attr('placeholder','USDTTRC20')
    }else {
      $(next_fs).find('input.address').attr('placeholder','Account number')
      $(next_fs).find('.others').html(setMethodEle[1])
    }

  }
  //Add Class Active
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate({opacity: 0}, {
    step: function(now) {
      // for making fielset appear animation
      opacity = 1 - now;

      current_fs.css({
        'display': 'none',
        'position': 'relative'
      });
      next_fs.css({'opacity': opacity});
    },
    duration: 500
  });
  setProgressBar(++current);
  if ($(this).attr('class').includes('finished')) {
    myjs.sendReq({url:'/setup-wallet',data:formData,csrftoken:myjs.getCookie('csrftoken'),method:'POST'})
    .then((res)=>{res.message?myjs.toastMess(res):0;res.redirect?Openurl(res.redirect):0;})
    .catch((err)=>{console.debug(err);})
  }
});

$(".previous").click(function(){

current_fs = $(this).parent();
previous_fs = $(this).parent().prev();

//Remove class active
$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

//show the previous fieldset
previous_fs.show();

//hide the current fieldset with style
current_fs.animate({opacity: 0}, {
step: function(now) {
// for making fielset appear animation
opacity = 1 - now;

current_fs.css({
'display': 'none',
'position': 'relative'
});
previous_fs.css({'opacity': opacity});
},
duration: 500
});
setProgressBar(--current);
});

function setProgressBar(curStep){
  var percent = parseFloat(100 / steps) * curStep;
  percent = percent.toFixed();
  $(".progress-bar")
  .css("width",percent+"%")
}

$(".submit").click(function(){
  return false;
})

});
