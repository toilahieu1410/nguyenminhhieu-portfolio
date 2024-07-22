function bar_group() {
  let group_ident = 1;
  $(".bar_group").each(function () {
    $(this).addClass("group_ident-" + group_ident),
    $(this).data("gid", group_ident),
    group_ident++;
  });
}

function get_max() {
  $(".bar_group").each(function () {
    const t = [];
    $(this).children().each(function () {
      t.push($(this).attr("value"));
    });
    const max_value = 100; // Set max value to 100
    $(this).data("bg_max", max_value);
  });
}

function data_labels() {
  $(".bar_group__bar").each(function () {
    if ($(this).attr("label")) {
      $('<p class="b_label">' + $(this).attr("label") + "</p>").insertBefore($(this));
    }
  });
}
function show_values() {
  $(".bar_group__bar").each(function () {
    if ($(this).attr("show_values") == "true") {
      $(this).css("margin-bottom", "40px");
      if ($(this).attr("unit")) {
        $(this).append('<p class="bar_label_min">0 ' + $(this).attr("unit") + "</p>");
        $(this).append('<p class="bar_label_max">' + $(this).parent().data("bg_max") + " " + $(this).attr("unit") + "</p>");
      } else {
        $(this).append('<p class="bar_label_min">0</p>');
        $(this).append('<p class="bar_label_max">' + $(this).parent().data("bg_max") + "</p>");
      }
    }
  });
}

function show_tooltips() {
  $(".bar_group__bar").each(function () {
    if ($(this).attr("tooltip") == "true") {
      $(this).css("margin-bottom", "40px");
      $(this).append('<div class="b_tooltip"><span>' + $(this).attr("value") + '</span><div class="b_tooltip--tri"></div></div>');
    }
  });
}

function in_view(t) {
  var a = $(t),
    i = $(window),
    s = i.scrollTop(),
    r = s + i.height(),
    n = a.offset().top,
    o = n + a.height();
  r > o - 45 &&
    a.css("width", (a.attr("value") / a.parent().data("bg_max")) * 100 + "%");
}
function bars() {
  bar_group(), get_max(), data_labels(), show_tooltips(), show_values();
}
(max_arr = {}),
  $(".bar_group__bar").each(function () {
    in_view($(this));
  }),
  $(window).scroll(function () {
    $(".bar_group__bar").each(function () {
      in_view($(this));
    });
  }),
  bars();
