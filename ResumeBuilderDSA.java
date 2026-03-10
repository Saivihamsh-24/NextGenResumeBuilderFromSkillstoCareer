class Resume {

    String name;
    String email;
    String phone;
    String summary;
    String education;
    String[] skills;

    Resume(String name, String email, String phone, String summary, String education, String[] skills) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.summary = summary;
        this.education = education;
        this.skills = skills;
    }

    void displayResume() {
        System.out.println("------ RESUME ------");
        System.out.println("Name: " + name);
        System.out.println("Email: " + email);
        System.out.println("Phone: " + phone);
        System.out.println();

        System.out.println("Summary:");
        System.out.println(summary);
        System.out.println();

        System.out.println("Education:");
        System.out.println(education);
        System.out.println();

        System.out.println("Skills:");
        for (String skill : skills) {
            System.out.println("- " + skill);
        }
    }
}

public class ResumeBuilderDSA {

    static int calculateATS(String[] skills) {

        String[] keywords = {"html","css","javascript","react","java","python","sql"};
        int found = 0;

        for(String k : keywords){
            for(String s : skills){
                if(k.equalsIgnoreCase(s)){
                    found++;
                }
            }
        }

        return (found * 100) / keywords.length;
    }

    public static void main(String[] args) {

        String[] skills = {"HTML","CSS","JavaScript","Java"};

        Resume r = new Resume(
                "Sai Vihamsh",
                "sai@email.com",
                "9876543210",
                "Motivated developer skilled in web technologies.",
                "B.Tech Computer Science",
                skills
        );

        r.displayResume();

        int atsScore = calculateATS(skills);

        System.out.println();
        System.out.println("ATS Score: " + atsScore + "%");
    }
}