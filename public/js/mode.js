if(currentTheme == 'dark') document.getElementById("modeSwitch").checked = true;
else if(currentTheme == 'light') document.getElementById("modeSwitch").checked = false;

if(currentTheme != null) document.documentElement.setAttribute('data-theme', currentTheme);

function changeMode(){
    if(currentTheme == 'light'){
        currentTheme = 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    else{
        currentTheme = 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
    localStorage.setItem('data-theme', currentTheme);
}