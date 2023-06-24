package com.realtimedashboard.livechar.dto;

import lombok.Data;

@Data
public class ScoreCard {
    private String team1;
    private String team2;
    private String totalRuns;
    private String totalOvers;
    private String battingTeamName;
    private String bowlingTeamName;
}
