        window.onload = function() {
            var nav = document.getElementsByTagName('nav')[0];
            var button = document.getElementById('toggle-button');
            button.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                    button.innerHTML = '▲';
                } else {
                    nav.style.display = 'none';
                    button.innerHTML = '▼';
                }
            });
        };