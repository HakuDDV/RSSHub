const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const currentUrl = `https://t.kcwiki.moe/`;
    const response = await got({
        method: 'get',
        url: currentUrl,
    });
    const $ = cheerio.load(response.data);
    const items = $('.panel.panel-info')
        .toArray()
        .map((item) => {
            item = $(item);
            const matches = item.text().match(/(\d{4})年(\d{1,2})月(\d{1,2})日 (\d{2}:\d{2}:\d{2})/);
            const pubtime= new Date(matches[1]+' '+matches[2]+' '+matches[3]+' '+matches[4]);
            return {
                title: item.text(),
                description: item.text(),
                link: `https://t.kcwiki.moe/`,
                pubDate: pubtime,
            };
        });

    ctx.state.data = {
        title: '舰娘官推更新信息',
        link: currentUrl,
        item: items,
    };
};
