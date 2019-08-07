package controllers;

import models.Assessment;
import models.Member;
import play.Logger;
import play.mvc.Controller;
import utils.Analytics;
import utils.MemberStats;

import java.util.Collections;
import java.util.List;

public class TrainerDashboard extends Controller
{
  public static void index()
  {
    List<Member> members = Member.findAll();
    Logger.info("Rendering Trainer Dashboard");
    render("trainerdashboard.html", members);
  }

  public static void trainerAssessment(Long id)
  {
    Member member = Member.findById(id);
    List<Assessment> assessments = member.assessments;
    MemberStats memberStats = Analytics.generateMemberStats(member);
    Collections.reverse(assessments);
    render("trainerassessment.html", member, assessments, memberStats);
  }

  public static void editComment(Long id, String comment)
  {
    Logger.info("Comment " + comment);
    Assessment assessment = Assessment.findById(id);
    assessment.comment = comment;
    assessment.save();
    redirect("/trainerdashboard");
  }

  public static void deleteMember(Long id)
  {
    Member member = Member.findById(id);
    if (member != null) {
      member.delete();
    }
    redirect("/trainerdashboard");
  }
}
