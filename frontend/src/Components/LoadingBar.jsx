import React from 'react'

function LoadingBar ({ placeholder, callback }) {
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    function move() {
      if (active) {
        var elem = document.getElementById('bar');
        var width = 1;
        var id = setInterval(frame, 50);
        function frame() {
          if (width >= 100) {
            setActive(false);
          } else {
            width++;
            elem.style.width = width + "%";
          }
        }
      }
    }
    move();

    return (() => {
      callback()
    })
  }, [])

  return (
    <div className='loading-bar'>
      {placeholder && <p>&gt; {placeholder}</p>}
      <div className='loading-bar__container'>
        <div id='bar' className='loading-bar__bar'/>
      </div>
    </div>
  )
}

export default LoadingBar
