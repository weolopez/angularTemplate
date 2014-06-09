
(function($) {
  var defaultLabeler, evElTarget, evTarget, generateNewMatchId, generateNewTeamId, group, initLocalTeamCounter, localMatchCounter, localTeamCounter, makeStandings, matchEditTemplate, matchTemplate, matchViewTemplate, methods, numberRe, roundCount, roundTemplate, roundsHeaderTemplate, roundsTemplate, scoringScheme, standingsEditTemplate, standingsScoreColumnMarkup, standingsViewTemplate, teamHover, teamPositionFromMatch, toIntOrNull, unwrap;
  scoringScheme = {
    win: 3,
    tie: 1,
    loss: 0
  };
  roundCount = function(participantCount) {
    return participantCount - 1 + (participantCount % 2);
  };
  toIntOrNull = function(string) {
    var value;
    if (!numberRe.test(string)) {
      return null;
    }
    value = parseInt(string);
    if (isNaN(value)) {
      return null;
    } else {
      return value;
    }
  };
  evTarget = function(ev) {
    return $(ev.currentTarget);
  };
  evElTarget = function(ev) {
    return [ev, evTarget(ev)];
  };
  teamPositionFromMatch = function(participants, team) {
    return participants.findIndex(function(p) {
      return p.id === team.id;
    });
  };
  unwrap = function(state) {
    return {
      teams: state.participants.value().map(function(team) {
        var _ref, _ref1;
        return {
          id: team.id,
          name: team.name,
          format: (_ref = team.format) != null ? _ref : "",
          data: (_ref1 = team.data) != null ? _ref1 : {}
        };
      }),
      matches: state.matches.map(function(match) {
        return {
          a: {
            team: teamPositionFromMatch(state.participants, match.a.team),
            score: match.a.score
          },
          b: {
            team: teamPositionFromMatch(state.participants, match.b.team),
            score: match.b.score
          },
          round: match.round
        };
      }).value()
    };
  };
  makeStandings = function(participants, pairs) {
    return participants.map(function(it) {
      var losses, matches, roundLosses, roundWins, ties, wins;
      matches = pairs.filter(function(match) {
        return match.a.score !== null && match.b.score !== null;
      }).filter(function(match) {
        return match.a.team === it || match.b.team === it;
      }).map(function(match) {
        if (match.a.team === it) {
          return {
            ownScore: match.a.score,
            opponentScore: match.b.score
          };
        } else {
          return {
            ownScore: match.b.score,
            opponentScore: match.a.score
          };
        }
      });
      roundWins = matches.reduce((function(acc, match) {
        return acc + match.ownScore;
      }), 0);
      roundLosses = matches.reduce((function(acc, match) {
        return acc + match.opponentScore;
      }), 0);
      wins = matches.filter(function(match) {
        return match.ownScore > match.opponentScore;
      }).size();
      losses = matches.filter(function(match) {
        return match.ownScore < match.opponentScore;
      }).size();
      ties = matches.filter(function(match) {
        return match.ownScore === match.opponentScore;
      }).size();
      return {
        team: it,
        wins: wins,
        losses: losses,
        ties: ties,
        points: wins * scoringScheme.win + ties * scoringScheme.tie + losses * scoringScheme.loss,
        roundWins: roundWins,
        roundLosses: roundLosses,
        ratio: roundWins - roundLosses
      };
    }).sortBy(function(it) {
      return -it.ratio;
    }).sortBy(function(it) {
      return -it.points;
    });
  };
  numberRe = new RegExp(/^[0-9]+$/);
  standingsScoreColumnMarkup = '\
    <td>{{wins}}</td>\
    <td>{{losses}}</td>\
    <td>{{ties}}</td>\
    <td>{{points}}</td>\
    <td title="Won {{roundWins}}, lost {{roundLosses}} bouts">{{ratio}}</td>';
  standingsViewTemplate = Handlebars.compile('\
    <div class="standings">\
      <table>\
        <colgroup>\
          <col style="width: 50%">\
          <col span="5" style="width: 10%">\
        </colgroup>\
        <tr><th></th><th>W</th><th>L</th><th>T</th><th>P</th><th>&plusmn;</th></tr>\
        {{#each this}}\
          <tr data-teamid="{{team.id}}"><td>{{#if team.label}}{{team.label}}{{else}}{{team.name}}{{/if}}</td>' + standingsScoreColumnMarkup + '</tr>\
        {{/each}}\
      </table>\
    </div>');
  standingsEditTemplate = Handlebars.compile('\
    <div class="standings">\
      <table>\
        <colgroup>\
          <col style="width: 40%">\
          <col span="6" style="width: 10%">\
        </colgroup>\
        <tr><th></th><th>W</th><th>L</th><th>T</th><th>P</th><th>&plusmn;</th><th></th></tr>\
        {{#each this}}\
          <tr><td><input class="name" type="text" data-prev="{{team.name}}" data-teamid="{{team.id}}" value="{{team.name}}" /></td>' + standingsScoreColumnMarkup + '<td class="drop" data-name="{{team.id}}" title="Drop team">&#x2A2F;</td></tr>\
        {{/each}}\
        <tr><td><input class="add" type="text" /></td><td colspan="6"><input type="submit" value="Add" disabled="disabled" /></td></tr>\
      </table>\
    </div>');
  roundTemplate = Handlebars.compile('\
    <div data-roundid="{{this}}" class="round">\
      {{#if this}}\
        <header>Round {{this}}</header>\
      {{else}}\
        <header>Unassigned</header>\
      {{/if}}\
    </div>');
  matchViewTemplate = Handlebars.compile('\
    <div data-matchid="{{id}}" class="match" draggable="{{draggable}}">\
      <div class="team" data-teamid="{{a.team.id}}">\
        <div class="label">{{a.team.label}}</div>\
        <div class="score {{homeClass}}">{{a.score}}</div>\
      </div>\
      <div class="team" data-teamid="{{b.team.id}}">\
        <div class="score {{awayClass}}">{{b.score}}</div>\
        <div class="label">{{b.team.label}}</div>\
      </div>\
    </div>');
  matchEditTemplate = Handlebars.compile('\
    <div data-matchid="{{id}}" class="match" draggable="{{draggable}}">\
      <div class="team" data-teamid="{{a.team.id}}">\
        <div class="label">{{a.team.label}}</div>\
        <input type="text" class="score home {{homeClass}}" value="{{a.score}}" />\
      </div>\
      <div class="team" data-teamid="{{b.team.id}}">\
        <input type="text" class="score away {{awayClass}}" value="{{b.score}}" />\
        <div class="label">{{b.team.label}}</div>\
      </div>\
    </div>');
  matchTemplate = function(match, template) {
    var classes, homeWins;
    homeWins = match.a.score > match.b.score;
    classes = {
      homeClass: homeWins ? "win" : "lose",
      awayClass: homeWins ? "lose" : "win"
    };
    return $(template(_.extend(classes, match)));
  };
  roundsHeaderTemplate = Handlebars.compile('\
    <header class="roundsHeader">Rounds</header>');
  roundsTemplate = Handlebars.compile('<div class="rounds"></div>');
  defaultLabeler = function(team) {
    return team.name;
  };
  localMatchCounter = 0;
  generateNewMatchId = function() {
    return ++localMatchCounter;
  };
  localTeamCounter = 0;
  generateNewTeamId = function() {
    return ++localTeamCounter;
  };
  initLocalTeamCounter = function(participants) {
    return localTeamCounter = participants.size() > 0 ? participants.max("id").value().id : 0;
  };
  teamHover = function($container, enabled) {
    return function() {
      var teamId;
      teamId = $(this).attr("data-teamid");
      return $container.find("[data-teamid=" + teamId + "]").toggleClass("highlight", enabled);
    };
  };
  group = function($container, participants, pairs, onchange, labeler) {
    var $rounds, Match, Round, matchById, matchProp, matchStream, moveStream, participantAdds, participantMoves, participantRemoves, participantRenames, participantStream, removeStream, renameStream, result, resultStream, resultUpdates, roundById, templates;
    roundById = function(id) {
      return $container.find("[data-roundid='" + id + "']");
    };
    matchById = function(id) {
      return $container.find("[data-matchid='" + id + "']");
    };
    if (onchange) {
      $container.addClass("read-write");
    }
    templates = (function() {
      return {
        standings: function(participantStream, renameStream, removeStream, participants) {
          var $markup, $submit, inputChanges, isValid, keyUps, markup, over;
          participants = participants || _([]);
          if (!onchange) {
            $markup = $(standingsViewTemplate(participants.value()));
            over = teamHover.bind(null, $container);
            $markup.find("[data-teamid]").hover(over(true), over(false));
            return $markup;
          }
          markup = $(standingsEditTemplate(participants.value()));
          $submit = markup.find("input[type=submit]");
          keyUps = markup.find("input").asEventStream("keyup").map(evTarget).map(function($el) {
            var previous, valid, value;
            value = $el.val();
            previous = $el.attr("data-prev");
            valid = value.length > 0 && (!participants.map(function(it) {
              return it.team;
            }).pluck("name").contains(value) || previous === value);
            return {
              el: $el,
              value: value,
              valid: valid
            };
          }).toProperty();
          keyUps.onValue(function(state) {
            state.el.toggleClass("conflict", !state.valid);
            if (state.el.hasClass("add")) {
              if (state.valid) {
                return $submit.removeAttr("disabled");
              } else {
                return $submit.attr("disabled", "disabled");
              }
            }
          });
          isValid = keyUps.map(function(state) {
            return state.valid;
          }).toProperty();
          inputChanges = function(type) {
            return markup.find("input." + type).asEventStream("change").filter(isValid).map(".target").map($);
          };
          inputChanges("name").onValue(function(el) {
            renameStream.push({
              id: parseInt(el.attr("data-teamid")),
              to: el.val()
            });
            return el.attr("data-prev", el.val());
          });
          inputChanges("add").map(function(el) {
            return el.val();
          }).onValue(function(value) {
            return participantStream.push({
              id: generateNewTeamId(),
              name: value,
              format: "",
              data: {}
            });
          });
          markup.find("td.drop").asEventStream("click").map(".target").map($).map(function(el) {
            return el.attr("data-name");
          }).onValue(function(value) {
            return removeStream.push(parseInt(value));
          });
          return markup;
        },
        roundsHeader: function($rounds) {
          var tmpl;
          tmpl = $(roundsHeaderTemplate());
          tmpl.asEventStream("click").onValue(function() {
            return $rounds.toggle();
          });
          return tmpl;
        },
        rounds: $(roundsTemplate()),
        round: function(roundNumber) {
          return $(roundTemplate(roundNumber));
        },
        matchEdit: function(match) {
          return matchTemplate(match, matchEditTemplate);
        },
        matchView: function(match) {
          return matchTemplate(match, matchViewTemplate);
        }
      };
    })();
    Round = (function() {
      return {
        create: function(moveStream, round) {
          return new function() {
            var eventCounter, r;
            r = templates.round(round);
            this.markup = r;
            if (!onchange) {
              return;
            }
            eventCounter = 0;
            round = function(ev) {
              return r.asEventStream(ev).doAction(".preventDefault");
            };
            round("dragover").onValue(function(ev) {});
            round("dragenter").map(evTarget).onValue(function($el) {
              if (eventCounter === 0) {
                $el.addClass("over");
              }
              eventCounter++;
            });
            round("dragleave").map(evTarget).onValue(function($el) {
              eventCounter--;
              if (eventCounter === 0) {
                $el.removeClass("over");
              }
            });
            round("drop").map(evElTarget).onValues(function(ev, $el) {
              var id, obj;
              eventCounter = 0;
              id = ev.originalEvent.dataTransfer.getData("Text");
              obj = matchById(id);
              $el.append(obj);
              $el.removeClass("over");
              moveStream.push({
                match: parseInt(id),
                round: parseInt($el.attr("data-roundId"))
              });
            });
          };
        }
      };
    })();
    Match = (function() {
      return {
        create: function(resultStream, match) {
          return new function() {
            var drag, input, markup;
            match = $.extend({}, match);
            match.draggable = (onchange != null).toString();
            if (!onchange) {
              this.markup = templates.matchView(match);
              return;
            }
            markup = templates.matchEdit(match);
            this.markup = markup;
            input = function(ev) {
              return markup.find("input").asEventStream(ev);
            };
            input("keyup").map(evTarget).onValue(function($el) {
              return $el.toggleClass("conflict", toIntOrNull($el.val()) === null);
            });
            input("change").onValue(function() {
              var scoreA, scoreB, update;
              scoreA = toIntOrNull(markup.find("input.home").val());
              scoreB = toIntOrNull(markup.find("input.away").val());
              if (scoreA === null || scoreB === null) {
                return;
              }
              update = {
                a: {
                  team: match.a.team,
                  score: scoreA
                },
                b: {
                  team: match.b.team,
                  score: scoreB
                }
              };
              return resultStream.push(update);
            });
            drag = function(ev) {
              return function(onval) {
                return markup.asEventStream(ev).map(".originalEvent").map(evElTarget).onValues(onval);
              };
            };
            drag("dragstart")(function(ev, $el) {
              ev.dataTransfer.setData("Text", match.id);
              $el.css("opacity", 0.5, "");
              return $container.find(".round").addClass("droppable");
            });
            drag("dragend")(function(ev, $el) {
              $el.removeAttr("style");
              return $container.find(".droppable").removeClass("droppable");
            });
          };
        }
      };
    })();
    matchStream = new Bacon.Bus();
    participantStream = new Bacon.Bus();
    renameStream = new Bacon.Bus();
    resultStream = new Bacon.Bus();
    moveStream = new Bacon.Bus();
    removeStream = new Bacon.Bus();
    matchProp = matchStream.toProperty({
      participants: _([]),
      matches: _([])
    });
    $rounds = templates.rounds.append($(Round.create(moveStream, 0).markup));
    $container.append(templates.standings(participantStream)).append(templates.roundsHeader($rounds)).append($rounds);
    participantAdds = matchProp.sampledBy(participantStream, function(propertyValue, streamValue) {
      var newMatches, rounds;
      if (propertyValue.participants.size() > 0) {
        newMatches = propertyValue.participants.map(function(it) {
          return {
            id: generateNewMatchId(),
            a: {
              team: it,
              score: null
            },
            b: {
              team: streamValue,
              score: null
            },
            round: 0
          };
        });
        propertyValue.matches = propertyValue.matches.union(newMatches.value());
      }
      streamValue.label = new Handlebars.SafeString(labeler(streamValue));
      propertyValue.participants.push(streamValue);
      rounds = roundCount(propertyValue.participants.size());
      _(_.range($rounds.find(".round").length - 1, rounds)).each(function(it) {
        return $rounds.append(Round.create(moveStream, it + 1).markup);
      });
      return propertyValue;
    });
    participantRemoves = matchProp.sampledBy(removeStream, function(propertyValue, streamValue) {
      var $unassigned, roundsAfter, roundsBefore;
      propertyValue.matches.filter(function(it) {
        return it.a.team.id === streamValue || it.b.team.id === streamValue;
      }).map(function(it) {
        return it.id;
      }).forEach(function(id) {
        return matchById(id).remove();
      });
      roundsBefore = roundCount(propertyValue.participants.size());
      propertyValue.participants = propertyValue.participants.filter(function(it) {
        return it.id !== streamValue;
      });
      roundsAfter = roundCount(propertyValue.participants.size());
      propertyValue.matches = propertyValue.matches.filter(function(it) {
        return it.a.team.id !== streamValue && it.b.team.id !== streamValue;
      }).map(function(it) {
        if (it.round > roundsAfter) {
          it.round = 0;
        }
        return it;
      });
      $unassigned = roundById(0);
      _(_.range(roundsAfter + 1, roundsBefore + 1)).each(function(id) {
        var $moved, $roundToBeDeleted;
        $roundToBeDeleted = roundById(id);
        $moved = $roundToBeDeleted.find('.match');
        $unassigned.append($moved);
        return $roundToBeDeleted.remove();
      });
      return propertyValue;
    });
    resultUpdates = matchProp.sampledBy(resultStream, function(propertyValue, streamValue) {
      propertyValue.matches = propertyValue.matches.map(function(it) {
        if (it.a.team.id === streamValue.a.team.id && it.b.team.id === streamValue.b.team.id) {
          if (streamValue.round !== void 0) {
            it.round = streamValue.round;
          }
          it.a.score = streamValue.a.score;
          it.b.score = streamValue.b.score;
        } else if (it.a.team.id === streamValue.b.team.id && it.b.team.id === streamValue.a.team.id) {
          if (streamValue.round !== void 0) {
            it.round = streamValue.round;
          }
          it.a.score = streamValue.b.score;
          it.b.score = streamValue.a.score;
        }
        return it;
      });
      return propertyValue;
    });
    participantRenames = matchProp.sampledBy(renameStream, function(propertyValue, streamValue) {
      propertyValue.participants = propertyValue.participants.map(function(it) {
        if (it.id === streamValue.id) {
          it.name = streamValue.to;
          it.label = new Handlebars.SafeString(labeler(it));
        }
        return it;
      });
      return propertyValue;
    });
    participantMoves = matchProp.sampledBy(moveStream, function(propertyValue, streamValue) {
      propertyValue.matches = propertyValue.matches.map(function(it) {
        if (it.id === streamValue.match) {
          it.round = streamValue.round;
        }
        return it;
      });
      return propertyValue;
    });
    result = Bacon.mergeAll([participantAdds, resultUpdates, participantRenames, participantRemoves, participantMoves]);
    result.throttle(10).onValue(function(state) {
      if (onchange) {
        return onchange(unwrap(state));
      }
    });
    participantAdds.merge(resultUpdates).merge(participantRemoves).throttle(10).onValue(function(state) {
      return $container.find(".standings").replaceWith(templates.standings(participantStream, renameStream, removeStream, makeStandings(state.participants, state.matches), null));
    });
    participantRenames.merge(participantAdds).merge(resultUpdates).throttle(10).onValue(function(state) {
      var $unassigned, assignedMatches, unassignedMatches;
      assignedMatches = state.matches.filter((function(it) {
        return it.round;
      }));
      unassignedMatches = state.matches.filter((function(it) {
        return !it.round;
      }));
      assignedMatches.each(function(it) {
        var $match, markup;
        $match = matchById(it.id);
        markup = Match.create(resultStream, it).markup;
        if ($match.length) {
          return $match.replaceWith(markup);
        } else {
          return roundById(it.round).append(markup);
        }
      });
      if (unassignedMatches.size() > 0 || onchange) {
        $unassigned = roundById(0);
        $unassigned.show();
        return unassignedMatches.each(function(it) {
          var $match, markup;
          $match = matchById(it.id);
          markup = Match.create(resultStream, it).markup;
          if ($match.length) {
            return $match.replaceWith(markup);
          } else {
            return $unassigned.append(markup);
          }
        });
      }
    });
    participants.each(function(it) {
      return participantStream.push(it);
    });
    return pairs.each(function(it) {
      return resultStream.push(it);
    });
  };
  methods = {
    init: function(opts) {
      var container, labeler, pairs, participants;
      opts = opts || {};
      labeler = opts.labeler || defaultLabeler;
      container = this;
      participants = _();
      pairs = _();
      if (opts.init) {
        participants = _(opts.init.teams);
        pairs = _(opts.init.matches).map(function(it) {
          it.a.team = opts.init.teams[it.a.team];
          it.b.team = opts.init.teams[it.b.team];
          return it;
        });
      }
      initLocalTeamCounter(participants);
      return group($('<div class="jqgroup"></div>').appendTo(container), participants, pairs, opts.save || null, labeler);
    }
  };
  return $.fn.group = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      return $.error("Method " + method + " does not exist on jQuery.group");
    }
  };
})(jQuery);
