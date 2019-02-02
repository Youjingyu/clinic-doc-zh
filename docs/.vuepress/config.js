module.exports = {
  // title: 'Clinic.js',
  description: 'Node Clinic 中文文档',
  base: '/clinic-doc-ch/',
  themeConfig: {
    logo: '/logo.png',
    logoLink: 'https://clinicjs.org/documentation',
    repo: 'Youjingyu/clinic-doc-ch',
    editLinks: true,
    docsDir: 'docs',
    sidebar: [
      '/',
      {
        title: 'Doctor',
        children: [
          'doctor/setup',
          'doctor/getting_ready',
          'doctor/first_analysis',
          'doctor/reading_a_profile',
          'doctor/fixing_an_event_loop_problem',
          'doctor/fixing_an_IO_problem',
        ]
      },
      {
        title: 'Flame',
        children: [
          'flame/setup',
          'flame/getting_ready',
          'flame/first_analysis',
          'flame/flamegraphs',
          'flame/controls',
          'flame/optimizing_a_hot_function',
          'flame/reducing_the_graph_size',
          'flame/advanced_analysis',
          'flame/advanced_controls'
        ]
      },
      {
        title: 'Bubbleprof',
        children: [
          'bubleprof/setup',
          'bubleprof/getting_ready',
          'bubleprof/first_analysis',
          'bubleprof/bubbles',
          'bubleprof/the_sidebar',
          'bubleprof/finding_the_first_bottleneck',
          'bubleprof/improving_our_latency',
          'bubleprof/parallel_queries',
          'bubleprof/caching_the_results'
        ]
      }
    ]
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/icon.png' }],
    ['style', {},  `
      p + blockquote, ol + blockquote,  ul + blockquote {
        display: none;
      }
    `],
    ['script', {}, `
      document.addEventListener('click', function (e) {
        var target = e.target
        var nextSibling
        if (target.tagName === 'P') {
          nextSibling = target.nextElementSibling
        } else if (target.tagName === 'LI') {
          nextSibling = target.parentNode.nextElementSibling
        }
        if (nextSibling && nextSibling.tagName === 'BLOCKQUOTE') {
          var hide = 'display:none'
          var show = 'display:block'
          var style = nextSibling.getAttribute('style')
          nextSibling.setAttribute('style', style === show ? hide : show)
        }
      })
    `],
    ["script", {},`
      var logoUrlChanger = setInterval(function () {
        // Anchor above the logo image
        var homeEls = document.getElementsByClassName('home-link')
        if (homeEls.length > 0) {
          var homeEl = homeEls[0]
          homeEl.setAttribute('href', 'https://clinicjs.org/documentation')
          homeEl.setAttribute('onclick', "document.location='https://clinicjs.org/documentation';return false;")
          clearInterval(logoUrlChanger)
        }

        // Actual logo image
        var logoEls = document.getElementsByClassName('logo')
        if (logoEls.length > 0) {
          var logoEl = logoEls[0]
          logoEl.setAttribute('onclick', "document.location='https://clinicjs.org/documentation';return false;")
          clearInterval(logoUrlChanger)
        }
      }, 1000)
    `
    ]
  ]
}