const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const rootUrl = 'http://www.yinghuacd.com';
    const currentUrl = `${rootUrl}/show/5031.html`;
    const response = await got({
        method: 'get',
        url: currentUrl,
    });
        const $ = cheerio.load(response.data);
        let items = $('.movurl>ul>li>a')
        .toArray()
        .map((item) => {
            item = $(item);

            
            return {
                title: item.text(),
                link: `${rootUrl}/${item.attr('href')}`,
            };
        });
 
    ctx.state.data = {
        title: '更新信息-凡人修仙传',
        link: currentUrl,
        item: items,
    };
};
