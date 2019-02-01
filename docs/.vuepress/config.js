module.exports = {
  // title: 'Clinic.js',
  description: 'Node Clinic 中文文档',
  base: '/clinic-doc-ch/',
  themeConfig: {
    logo: '/logo.png',
    logoLink: 'https://clinicjs.org/documentation',
    repo: 'Youjingyu/clinic-doc-ch',
    sidebar: [
      'getting_started',
      {
        title: 'Flame',
        children: [
          'flame/setup',
          'flame/getting_ready',
          'flame/first_ analysis',
          'flame/flamegraphs',
          'flame/optimizing_a_hot_function',
          'flame/reducing_the_graph_size',
          'flame/advanced_analysis',
          'flame/advanced_controls'
        ]
      },
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
    ['link', { rel: 'icon', href: '/icon.png' }],
    // ['style', {},  `
    //   blockquote {
    //     display: none;
    //   }
    // `],
    // ['script', {}, `
    //   document.addEventListener('click', function (e) {
    //     var target = e.target
    //     if (target.tagName === 'P') {
    //       var nextSibling = target.nextElementSibling
    //       if (nextSibling.tagName === 'BLOCKQUOTE') {
    //         var hide = 'display:none'
    //         var show = 'display:block'
    //         var style = nextSibling.getAttribute('style')
    //         nextSibling.setAttribute('style', style === show ? hide : show)
    //       }
    //     }
    //   })
    // `],
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