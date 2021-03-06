window.onload = () => {

    loadData();
    var urlImage = 'http://dev.mangobits.net:8080/NICLandPagesWs/rs/event/image/'
    var urlCompany = 'http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/'

    function $$(element) {
        return document.querySelector(element);
    }

    function navigation(data) {
        var logo = $$('.logo');

        var { id } = data;

        logo.src = `${urlImage}${id}/logo`;
    }

    function createCss(data) {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.id = data.id;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'http://dev.mangobits.net:8080/NICLandPagesWs/rs' + '/event/css/' + data.id;
        link.media = 'all';
        head.appendChild(link);

        console.log(link)
    }

    function renderIntro(data) {
        var mainTitle = $$('.title'); // Name
        var titleSub = $$('.title-sub'); // mainMessage
        var titleSub2 = $$('.title-sub-2'); // secondaryMessage

        var bgImage = $$('.bg-cover');

        var { name, mainMessage, secondaryMessage, id } = data;

        mainTitle.innerHTML = name;
        titleSub.innerHTML = mainMessage;
        titleSub2.innerHTML = secondaryMessage;
        bgImage.setAttribute("style", `background-image: url(${urlImage}${id}/cover)`);
    }

    function renderDownload(data) {
        var mainTitle = $$('.title-download'); // Name
        var titleSub = $$('.title-sub-download'); // mainMessage
        var logo = $$('.logo-download');


        var { name, mainMessage, id } = data;

        mainTitle.innerHTML = name;
        titleSub.innerHTML = mainMessage;
        logo.src = `${urlImage}${id}/logo`;
    }

    function loadData() {
        var urlBase = 'http://dev.mangobits.net/NICLandPagesWs';
        var urlId = window.location.href.split("?e=");
        var urlComplete = `${urlBase}/rs/event/load/${urlId[1]}`;

        axios.get(urlComplete)
            .then((response) => {
                console.log(response.data.data);
                renderIntro(response.data.data);
                navigation(response.data.data);
                renderCompany(response.data.data.companies);
                createCss(response.data.data);
                renderDownload(response.data.data);



                //carrega o js da template no final, para processar tudo
                $.getScript("js/rgen.js", function (data, textStatus, jqxhr) {
                    console.log("OK")
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }

}

function renderCarousel(imageIds, companyId) {
    console.log(imageIds);
    
    //http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/6c844697-4b35-41b4-be3f-cb708fc83494/94837799-53e1-43af-8bde-a3be6e952fb0
    const imageArray = imageIds.map(images => `<div class="item pd-10"><img src="http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/${companyId}?id=${images.id}"/></div>`).join('')

    return `
        <div class="carousel-widget ctrl-1 popgallery-widget mr-auto" data-items="1" data-nav="true" data-pager="true" data-itemrange="0,1"
        data-margin="30" data-autoplay="false" data-hauto="false" data-in="false" data-out="false" data-center="true">
            <div class="owl-carousel">
                ${imageArray}
            </div>
        </div>
    `;
}

function renderCompanyPar(element) {
    return `<div class="flex-col-md-6">
    <div class="flex-row company-padding company-padding-top">
        <div class="flex-col-md-3">
            <img src="http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/${element.id}/logo" />
        </div>
        <div class="flex-col-md-8 flex-col-md-offset-1">
            <h3 class="mini">${element.name}</h3>
            <div class="star-rating">
                __COMPANY_STARS__
                <input type="hidden" name="whatever1" class="rating-value" value="2.56">
            </div>
            <div class="flex-row">
                <div class="flex-col-md-6">
                    <span class="fa fa-map-marker"></span>
                    <span class="mini">${element.address}</span>
                </div>
                <div class="flex-col-md-5 flex-col-md-offset-1">
                    <!--<span class="fa fa-map-o"></span>-->
                    <div class="flex-row">
                        <!--<h5 class="mini">__COMPANY_TIME__</h5>-->
                        <!--&nbsp;&nbsp;<p class="mini">__COMPANY_DISTANCE__ km</p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex-row company-padding">
        <div class="flex-col-md-12">
            <p>${element.desc}</p>
        </div>
    </div>

    <div class="flex-row company-padding">
        <div class="flex-col-md-6 product-panel">
            <div class="product-panel-body">
                <p class="product-title">${element.salesOff[0].title}</p>
                <b>
                    <p class="product-value">${numeral(element.salesOff[0].priceNow).format('$0,0.00')}</p>
                </b>
                <p class="product-info">Diária</p>
            </div>
        </div>
        <div class="flex-col-md-6 product-panel">
            <div class="product-panel-body">
                <p class="product-title">${element.salesOff[1].title}</p>
                <b>
                    <p class="product-value">${numeral(element.salesOff[1].priceNow).format('$0,0.00')}</p>
                </b>
                <p class="product-info">Diária</p>
            </div>
        </div>
    </div>

    <div class="flex-row company-padding">
        <div class="flex-col-md-4 flex-col-md-offset-4">
            <a href="${element.info.url}" id="demo" type="button" class="btn btn-primary solid mr-b-10 center reservation" id-event="${element.id}">Faça a sua Reserva</a>
            <!--<button href="__COMPANY_URL__" id="demo" type="button" class="btn btn-primary solid mr-b-10 center reservation" id-event="__COMPANY_ID__">Faça a sua Reserva</button>-->
        </div>
    </div>
    <div class="flex-row">
        <div class="flex-col-md-12">
            <iframe width="100%" height="193px" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBQ-vZgU3AbX3yTTp_SlhPvBQAL8Rd5zx0&q=${element.address}"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</div>
<div class="flex-col-md-6">
    <div class="bg-holder img-half r z1" data-rgen-sm="pos-rel px-h400">
        ${renderCarousel(element.gallery, element.id)}
    </div>
</div>`
}

function renderCompanyImpar(element) {
    return `<div class="flex-col-md-6">
    
    <div class="bg-holder img-half l z1" data-rgen-sm="pos-rel px-h400">
        ${renderCarousel(element.gallery, element.id)}
    </div>
</div>
<div class="flex-col-md-6">
    <div class="flex-row company-padding company-padding-top">
        <div class="flex-col-md-3">
            <img src="http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/${element.id}/logo" />
        </div>
        <div class="flex-col-md-8 flex-col-md-offset-1">
            <h3 class="mini">${element.name}</h3>
            <div class="star-rating">
                __COMPANY_STARS__
                <input type="hidden" name="whatever1" class="rating-value" value="2.56">
            </div>
            <div class="flex-row">
                <div class="flex-col-md-6">
                    <span class="fa fa-map-marker"></span>
                    <span class="mini">${element.address}</span>
                </div>
                <div class="flex-col-md-5 flex-col-md-offset-1">
                    <!--<span class="fa fa-map-o"></span>-->
                    <div class="flex-row">
                        <!--<h5 class="mini">__COMPANY_TIME__</h5>-->
                        <!--&nbsp;&nbsp;<p class="mini">__COMPANY_DISTANCE__ km</p>-->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex-row company-padding">
        <div class="flex-col-md-12">
            <p>${element.desc}</p>
        </div>
    </div>

    <div class="flex-row company-padding">
        <div class="flex-col-md-6 product-panel">
            <div class="product-panel-body">
                <p class="product-title">${element.salesOff[0].title}</p>
                <b>
                    <p class="product-value">${numeral(element.salesOff[0].priceNow).format('$0,0.00')}</p>
                </b>
                <p class="product-info">Diária</p>
            </div>
        </div>
        <div class="flex-col-md-6 product-panel">
            <div class="product-panel-body">
                <p class="product-title">${element.salesOff[1].title}</p>
                <b>
                    <p class="product-value">${numeral(element.salesOff[1].priceNow).format('$0,0.00')}</p>
                </b>
                <p class="product-info">Diária</p>
            </div>
        </div>
    </div>

    <div class="flex-row company-padding">
        <div class="flex-col-md-4 flex-col-md-offset-4">
            <a href="${element.info.url}" id="demo" type="button" class="btn btn-primary solid mr-b-10 center reservation" id-event="${element.id}">Faça a sua Reserva</a>
            <!--<button href="__COMPANY_URL__" id="demo" type="button" class="btn btn-primary solid mr-b-10 center reservation" id-event="__COMPANY_ID__">Faça a sua Reserva</button>-->
        </div>
    </div>
    <div class="flex-row">
        <div class="flex-col-md-12">
            <iframe width="100%" height="193px" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBQ-vZgU3AbX3yTTp_SlhPvBQAL8Rd5zx0&q=${element.address}"
                allowfullscreen>
            </iframe>
        </div>
    </div>
</div>`
}


function renderCompany(data) {
    var company = document.querySelector('.allCompany');
    //http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/6c844697-4b35-41b4-be3f-cb708fc83494/logo
    //http://dev.mangobits.net:8080/NICLandPagesWs/rs/company/companyImage/6c844697-4b35-41b4-be3f-cb708fc83494/logo
    var elements = data.map((element, index) => `
    <section class="section company">
        <div class="flex-row company-data">
            ${index % 2 == 0 ? renderCompanyPar(element) : renderCompanyImpar(element)}
        </div>
    </section>
    `).join('');

    company.innerHTML = elements;
}
