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
        title: '火焰图',
        children: [
          'flame/setup',
          'flame/getting_ready',
          'flame/first_ analysis',
          'flame/flamegraphs',
          'flame/controls'
        ]
      }
    ]
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ["script", {},
        `
      const logoUrlChanger = setInterval(function() {
      //Anchor above the logo image
      const homeEls = document.getElementsByClassName("home-link");
      if(homeEls.length > 0) {
        const homeEl = homeEls[0];
        homeEl.setAttribute("href", "https://clinicjs.org/documentation");
        homeEl.setAttribute("onclick", "document.location='https://clinicjs.org/documentation';return false;");
        clearInterval(logoUrlChanger);
      }

      //Actual logo image
      const logoEls = document.getElementsByClassName("logo")
      if(logoEls.length > 0) {
        const logoEl = logoEls[0]
        logoEl.setAttribute("onclick", "document.location='https://clinicjs.org/documentation';return false;");
        clearInterval(logoUrlChanger);
      }
      }, 1000)

      `
    ]
  ]
}