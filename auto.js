const puppeteer=require('puppeteer')
const codeobj=require('./code')

const loginlink='https://www.hackerrank.com/auth/login'
const email='mclane.emric@zooants.com'
const password='usjhu3U&'

let browserOpen=puppeteer.launch(
    { headless:false,
      args:['--start-maximized'],
       defaultViewport:null
    }
)
let page
browserOpen.then(function(browserObj)
{
let browserOpenPromise=browserObj.newPage()
return browserOpenPromise;
}
).then(function(newTab){
  page=newTab
  let hackerrankOpenPromise=newTab.goto(loginlink)
  return hackerrankOpenPromise
}).then(function(){
  let emailIsEntered=page.type("input[type='text']",email,{delay:50})
  return emailIsEntered
}).then(function()
{
  let passIsEntered=page.type("input[type='password']",password,{delay:50})
  return passIsEntered 
}).then(function(){
  let loginButtonClicked=page.click('button[data-analytics="LoginPassword"]',{delay:50})
  return loginButtonClicked
}).then(function(){
   let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
   return clickOnAlgoPromise
}).then(function(){
  let getToWarmup=waitAndClick('input[value="warmup"]',page)
  return getToWarmup
}).then(function(){
  let waitfor3=page.waitFor(3000)
  return waitfor3
}).then(function(){
  let allChallengePromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
  return allChallengePromise
}).then(function(questionsArr){
    console.log('number of questions',questionsArr.length)
    let questionWillbeSolved=questionSolver(page,questionsArr[0],codeobj.answer [0])
    return questionWillbeSolved
})


function waitAndClick(selector ,cPage)
{

  return new Promise(function(resolve,reject){
      let waitforModulePromise=cPage.waitForSelector(selector)
      waitforModulePromise.then(function(){
        let clickModal=cPage.click(selector)
        return clickModal
      }).then(function(){
         resolve()
      }).catch(function(err){
          reject()
      })
  })
}

function questionSolver(page,question,answer){
  return new Promise(function(resolve,reject){
    let questionWillbeClicked=question.click()
    questionWillbeClicked.then(function(){
        return waitAndClick('input.checkbox-input',page)
    }).then(function(){
        return page.waitForSelector('textarea.custominput',page)
    }).then(function(){
        return page.type('textarea.custominput',answer,{delay:50})
    }).then(function(){
        let ctrlIsPressed=page.keyboard.down('Control')
        return ctrlIsPressed
    }).then(function(){
       let AisPressed=page.keyboard.press('A',{delay:100})
       return AisPressed
    }).then(function(){
      let Xispressed=page.keyboard.press('X',{delay:100})
      return Xispressed
    }).then(function(){
      let ctrlisUnpressed=page.keyboard.up('Control')
      return ctrlisUnpressed
    }).then(function(){
       let mainEditorFocus=waitAndClick('.monaco-editor.no-user-select.vs',page)
       return mainEditorFocus
    }).then(function(){
      let ctrlIsPressed=page.keyboard.down('Control')
      return ctrlIsPressed
  }).then(function(){
     let AisPressed=page.keyboard.press('A',{delay:100})
     return AisPressed
  }).then(function(){
    let Vispressed=page.keyboard.press('V',{delay:100})
    return Vispressed
  }).then(function(){
    let submitPressed=page.click('.ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled')
    return submitPressed
  })
})  
 } //question