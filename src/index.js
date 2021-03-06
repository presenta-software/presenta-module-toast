import './global.css'
import css from './style.css'

const parser = new window.DOMParser()

const module = function (sceneElement, modConfig) {
  const text = modConfig.text || modConfig

  const delay = parseInt(modConfig.enter) > 0 ? parseInt(modConfig.enter) : 0
  const duration = parseInt(modConfig.exit) > 0 ? parseInt(modConfig.exit) : 0

  let enter = 'auto'
  if (modConfig.enter) enter = modConfig.enter
  if (delay > 0) enter = 'auto'

  let exit = 'auto'
  if (modConfig.exit === 'click') exit = 'click'
  if (duration > 0) exit = 'auto'

  let dom = null

  const enterEffect = 'bounceIn'
  const exitEffect = 'bounceOut'

  const show = () => {
    sceneElement.removeEventListener('click', show)

    const child = `<div class="${css.toast}">
      <div class="${css.strip} animate__animated animate__${enterEffect}">${text}</div>
    </div>`

    dom = parser.parseFromString(child, 'text/html').body.childNodes[0]
    sceneElement.querySelector('.moduleFrontWrapper').appendChild(dom)

    const strip = dom.querySelector('.' + css.strip)
    strip.addEventListener('click', (e) => {
      hide()
      e.stopPropagation()
      e.preventDefault()
    })

    if ((exit === 'auto') && duration > 0) {
      setTimeout(hide, (duration + delay) * 1000)
    }
    if (exit === 'click') {
      sceneElement.addEventListener('click', hide)
    }
  }

  const hide = () => {
    if (dom) {
      const strip = dom.querySelector('.' + css.strip)
      strip.classList.remove(`animate__${enterEffect}`)
      strip.classList.add(`animate__${exitEffect}`)
      setTimeout(() => {
        dom.remove()
      }, 750)
    }
  }

  const showByKey = e => {
    if (e.key === enter) show()
  }

  switch (enter) {
    case 'click':
      sceneElement.addEventListener('click', show)
      break

    case 'auto':
      setTimeout(show, delay * 1000)
      break

    default:
      document.addEventListener('keyup', showByKey)
      break
  }

  this.destroy = () => {
    sceneElement.removeEventListener('click', show)
    sceneElement.removeEventListener('click', hide)
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
