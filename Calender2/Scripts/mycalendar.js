$(document).ready(function () {
    Date.prototype.getDays = function () { return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate(); };

    var months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        DayCountOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        short_months = ['Ock', 'Şbt', 'Mrt', 'Nsn', 'Mys', 'Hzr', 'Tem', 'Ağs', 'Eyl', 'Ekm', 'Ksm', 'Ara'],
        daysofweek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
        short_days = ['Pzrts', 'Salı', 'Çrşmb', 'Prşmb', 'Cuma', 'Cmrts', 'Pzr'];

    $.each(short_days, function (i, val) {
        $('#weekofdays').append('<div class="mycalendar-day">' + val + '</div>');
    });
    var currentdate = new Date();
    var datetime = "Now: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    //alert("Bugün : " + currentdate.getDate());
    //alert("Günlerden : " + daysofweek[currentdate.getDay() - 1]);
    var hesap = (currentdate.getDate() % 7);
    var ilkgun;
    var firstDayofMonth;
    var number=1;
    //alert(hesap);
    $.each(new Array(hesap), function (i) {
        if ((currentdate.getDay() - 1) - i < 0) {
            //alert(daysofweek[7 - number]);
            if (i == hesap-1) {
                //alert("İşte aranan gün : " + daysofweek[7 - i]);
                ilkgun = daysofweek[7 - number];
                firstDayofMonth = 7 - number;
            }
            number = number + 1;
        }
        else {
            //alert(daysofweek[(currentdate.getDay() - 1) - i]);
            if (i == hesap-1) {
                //alert("İşte aranan gün : " + daysofweek[(currentdate.getDay() - 1) - i]);
                ilkgun = daysofweek[(currentdate.getDay() - 1) - i];
                firstDayofMonth = (currentdate.getDay() - 1) - i;
            }
        }
    });
    if (hesap == 0) {
        //alert("İşte aranan gün : " + daysofweek[currentdate.getDay()]);
        ilkgun = daysofweek[currentdate.getDay()];
        firstDayofMonth = currentdate.getDay();
    }
    //alert("Bu ne tutuyor ? " + ilkgun);
    //alert("O halde : " + firstDayofMonth);
    var oncekiay = DayCountOfMonths[currentdate.getMonth()];
    var temp = firstDayofMonth-1;
    var gunler='';
    //alert("Temp : " + temp);
    //alert("Onceki Ay:" + oncekiay);
    $.each(new Array(firstDayofMonth), function (i) {
        gunler = gunler + '<div class="numberday pasif">' + (oncekiay-temp) + '</div>';
        temp = temp - 1;
    });
    $('.mycalendar-body').append('<div class="mycalendar-week">' + gunler + '</div>');
    gunler = '';
    number = 1;
    $.each(new Array(7 - firstDayofMonth), function (i) {
        if (currentdate.getDate() == number) {
            gunler = gunler + '<div class="numberday today">' + number + '</div>';
        }
        else {
            gunler = gunler + '<div class="numberday">' + number + '</div>';
        }
        number = number + 1;
    });
    $('.mycalendar-week').append(gunler);
    gunler = '';
    hesap = 0;
    $.each(new Array(7), function (i) {
        temp = number;
        $.each(new Array(7), function () {
            if (number <= DayCountOfMonths[currentdate.getMonth()]) {
                if (currentdate.getDate() == number) {
                    gunler = gunler + '<div class="numberday today">' + number + '</div>';
                }
                else {
                    gunler = gunler + '<div class="numberday">' + number + '</div>';
                }
                number = number + 1;
            }
        });
        if (temp <= DayCountOfMonths[currentdate.getMonth()]) {
            $('.mycalendar-body').append('<div class="mycalendar-week">' + gunler + '</div>');
            gunler = '';
        }
    });
    var lastday1 = new Date(currentdate.getFullYear(), currentdate.getMonth(), DayCountOfMonths[currentdate.getMonth()]);
    var lastdayindex1 = 0;
    if ((lastday1.getDay() - 1) < 0) {
        lastdayindex1 = 6;
    }
    else {
        lastdayindex1 = (lastday1.getDay() - 1);
    }
    hesap = 7 - (lastdayindex1 + 1);
    $.each(new Array(hesap), function (i) {
        gunler = gunler + '<div class="numberday pasif">' + (i+1) + '</div>';
    });
    $('.mycalendar-week').append(gunler);
    var tarih = new Date();
    /*Geçmiş tarihe gitmek için*/
    $('.mycalendar-left').click(function () {
        var deger = $('.mycalendar-month').html();
        $.each(months, function (i) {
            if (months[i] == deger) {
                temp = i;
                if (deger == 'Ocak') {
                    tarih = new Date(tarih.getFullYear() - 1, 11, 1);
                    $('.mycalendar-month').html(months[tarih.getMonth()]);
                    $('.mycalendar-year').html(tarih.getFullYear());
                }
                else {
                    tarih = new Date(tarih.getFullYear(), tarih.getMonth() - 1, 1);
                    $('.mycalendar-month').html(months[temp - 1]);
                }
            }
        });
        calendarOfdate(tarih);
    });
    /*Gelecekteki bir tarihe gitmek için*/
    $('.mycalendar-right').click(function () {
        var deger = $('.mycalendar-month').html();
        $.each(months, function (i) {
            if (months[i] == deger) {
                temp = i;
                if (deger == 'Aralık') {
                    tarih = new Date(tarih.getFullYear() + 1, 0, 1);
                    $('.mycalendar-month').html(months[tarih.getMonth()]);
                    $('.mycalendar-year').html(tarih.getFullYear());
                }
                else {
                    tarih = new Date(tarih.getFullYear(), tarih.getMonth()+1,1);
                    $('.mycalendar-month').html(months[temp + 1]);
                }
            }
        });
        calendarOfdate(tarih);
    });
    /*Tıklanan günün tarihini gösterme*/
    $('.numberday').click(function () {
        var thismonth='';
        var thisyear = '';
        var gecici = 0;
        if ($(this).hasClass("pasif") == false) {
            thismonth = $('.mycalendar-month').html();
            thisyear = $('.mycalendar-year').html();
            alert($(this).html() + " " + thismonth + " " + thisyear);
        }
        else {
            thismonth = $('.mycalendar-month').html();
            thisyear = $('.mycalendar-year').html();
            $.each(months, function (i) {
                if (months[i] == thismonth) {
                    gecici = i;
                }
            });
            if ($(this).html() < 15) {
                if ((gecici + 1) == 12) {
                    thisyear = thisyear + 1;
                }
                alert($(this).html() + " " + months[gecici + 1] + " " + thisyear);
            }
            else {
                if ((gecici - 1) == (-1)) {
                    thisyear = thisyear - 1;
                }
                alert($(this).html() + " " + months[gecici - 1] + " " + thisyear);
            }
        }
    });
});
function calendarOfdate(tarih) {
    var bugun = new Date();
    $('.mycalendar-week').remove();
    var months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
        DayCountOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        short_months = ['Ock', 'Şbt', 'Mrt', 'Nsn', 'Mys', 'Hzr', 'Tem', 'Ağs', 'Eyl', 'Ekm', 'Ksm', 'Ara'],
        daysofweek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
        short_days = ['Pzrts', 'Salı', 'Çrşmb', 'Prşmb', 'Cuma', 'Cmrts', 'Pzr'];
    var gunler = '';
    var oncekiay = 0;
    if ((tarih.getMonth() - 1) < 0) {
        oncekiay = DayCountOfMonths[11];
    }
    else {
        oncekiay = DayCountOfMonths[tarih.getMonth() - 1];
    }
    var temp = 0;
    var imp = 0;
    if (tarih.getDay() < 2) {
        temp = 7 - (2 - tarih.getDay());
        if (tarih.getDay() < 1) {
            imp = 7 - (1 - tarih.getDay());
        }
        else {
            imp = tarih.getDay() - 1;
        }
    }
    else {
        temp = tarih.getDay() - 2;
        imp = tarih.getDay() - 1;
    }
    //alert("GetDay() : " + tarih.getDay());
    //alert("Imp : " + imp);
    $.each(new Array(imp), function (i) {
        gunler = gunler + '<div class="numberday pasif" onclick="bft(' + (oncekiay - temp) + ')">' + (oncekiay - temp) + '</div>';
        temp = temp - 1;
    });
    $('.mycalendar-body').append('<div class="mycalendar-week">' + gunler + '</div>');
    var number = 1;
    gunler = '';
    $.each(new Array(7 - (imp)), function (i) {
        gunler = gunler + '<div class="numberday">' + number + '</div>';
        number = number + 1;
    });
    $('.mycalendar-week').append(gunler);
    gunler = '';
    var hesap = 0;
    var suankiay = $('.mycalendar-month').html();
    var suankiyil = $('.mycalendar-year').html();
    $.each(new Array(7), function (i) {
        temp = number;
        $.each(new Array(7), function () {
            if (number <= DayCountOfMonths[tarih.getMonth()]) {
                if (bugun.getDate() == number && months[bugun.getMonth()] == suankiay && bugun.getFullYear() == suankiyil) {
                    gunler = gunler + '<div class="numberday today">' + number + '</div>';
                }
                else {
                    gunler = gunler + '<div class="numberday" onclick="tıklama(' + number + ')">' + number + '</div>';
                }
                number = number + 1;
            }
        });
        if (temp <= DayCountOfMonths[tarih.getMonth()]) {
            $('.mycalendar-body').append('<div class="mycalendar-week">' + gunler + '</div>');
            gunler = '';
        }
    });
    //hesap = (DayCountOfMonths[tarih.getMonth()] - tarih.getDate()) % 7;
    //hesap = hesap + (tarih.getDay());
    //hesap = 7 - hesap;
    //gunler = '';
    //alert("Hesap : " + hesap + "\nAydaki gün sayısı : " + DayCountOfMonths[tarih.getMonth()]);
    var lastday = new Date(tarih.getFullYear(), tarih.getMonth(), DayCountOfMonths[tarih.getMonth()]);
    var lastdayindex = 0;
    if ((lastday.getDay() - 1) < 0) {
        lastdayindex = 6;
    }
    else {
        lastdayindex = (lastday.getDay() - 1);
    }
    //alert("Gün : " + lastday.getDate() + " Ay :" + months[lastday.getMonth()] + " Yıl : " + lastday.getFullYear() + "Haftanın günü : " + daysofweek[lastdayindex]);
    //alert("Index : " + lastdayindex);
    hesap = 7 - (lastdayindex + 1);
    $.each(new Array(hesap), function (i) {
        gunler = gunler + '<div class="numberday pasif" onclick="aft('+(i+1)+')">' + (i + 1) + '</div>';
    });
    $('.mycalendar-week').append(gunler);
}
var months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    DayCountOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    short_months = ['Ock', 'Şbt', 'Mrt', 'Nsn', 'Mys', 'Hzr', 'Tem', 'Ağs', 'Eyl', 'Ekm', 'Ksm', 'Ara'],
    daysofweek = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    short_days = ['Pzrts', 'Salı', 'Çrşmb', 'Prşmb', 'Cuma', 'Cmrts', 'Pzr'];
function tıklama(i) {
    var thismonth = $('.mycalendar-month').html();
    var thisyear = $('.mycalendar-year').html();
    alert(i + " " + thismonth + " " + thisyear);
}
function bft(i) {
    var thismonth = $('.mycalendar-month').html();
    var thisyear = $('.mycalendar-year').html();
    var gecici = 0;
    $.each(months, function (i) {
        if (months[i] == thismonth) {
            gecici = i;
        }
    });
    var ay = 0;
    if ((gecici - 1) == (-1)) {
        thisyear = thisyear - 1;
        ay = 11;
    }
    alert(i + " " + months[ay] + " " + thisyear);
}
function aft(i) {
    var thismonth = $('.mycalendar-month').html();
    var thisyear = $('.mycalendar-year').html();
    var gecici = 0;
    $.each(months, function (i) {
        if (months[i] == thismonth) {
            gecici = i;
        }
    });
    var ay = 0;
    if ((gecici + 1) == 12) {
        thisyear = (thisyear-1)+2;
        ay=0
    }
    alert(i + " " + months[ay] + " " + thisyear);
}