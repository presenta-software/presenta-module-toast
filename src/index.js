import './global.css'
import css from './style.css'

const parser = new DOMParser()

const module = function (sceneElement, modConfig, sceneConfig, projectConfig) {
  const ob = sceneConfig.toast
  if (!ob) return

  const delay = ob.delay || 1

  const enterEffect = 'bounceIn'
  const exitEffect = 'fadeOut'

  const show = () => {
    const child = `<div class="${css.toast}">
      <div class="${css.strip} animate__animated animate__${enterEffect} animate__delay-${delay}s">${ob.text}</div>
    </div>`

    const dom = parser.parseFromString(child, 'text/html').body.childNodes[0]
    sceneElement.appendChild(dom)

    const strip = dom.querySelector('.' + css.strip)
    strip.addEventListener('click', (e) => {
      strip.classList.remove(`animate__${enterEffect}`, `animate__delay-${delay}s`)
      strip.classList.add(`animate__${exitEffect}`)
      e.stopPropagation()
      e.preventDefault()
    })
  }

  const showByKey = e => {
    if (e.key === ob.enter) show()
  }

  if (ob.enter === 'click') {
    sceneElement.addEventListener('click', show)
  }
  if (ob.enter === 'step') {
    sceneElement.addEventListener('click', show)
  }
  if (typeof ob.enter === 'string') {
    document.addEventListener('keyup', showByKey)
  }

  if (!ob.enter || ob.enter === 'auto') {
    show()
  }

  this.destroy = () => {
    sceneElement.removeEventListener('click', show)
    document.removeEventListener('keyup', showByKey)
  }
}

module.install = Presenta => {
  Presenta.addModule('toast', module)
  Presenta.addProp(['toastPadding', 'toastBackColor', 'toastForeColor', 'toastFlexAlign', 'toastFlexJustify', 'toastShadow', 'toastFontSize'])
  Presenta.addGlob(['toastVar', 'toastPosition'])
}

export default module

if (typeof window !== 'undefined' && window.Presenta) {
  window.Presenta.use(module)
}
