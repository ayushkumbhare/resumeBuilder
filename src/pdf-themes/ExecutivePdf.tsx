import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

const createStyles = (styles: StyleOptions) => {
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const marginMm = styles.documentMargin || 14;

  return StyleSheet.create({
    page: {
      padding: `${marginMm}mm 18mm`,
      backgroundColor: '#fff',
      fontFamily: 'Times-Roman',
      fontSize: bodySize,
      color: '#1a1a1a',
      lineHeight: lineHeight,
    },
    header: {
      textAlign: 'center',
      marginBottom: 8,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Times-Bold',
      color: '#1a1a1a',
      letterSpacing: 3,
      textTransform: 'uppercase',
      marginBottom: 3,
      lineHeight: 1.15,
    },
    headline: {
      fontSize: bodySize,
      fontFamily: 'Times-Italic',
      color: '#555',
      marginBottom: 5,
      lineHeight: 1.2,
    },
    ruleDouble: {
      borderTopWidth: 1,
      borderTopColor: '#1a1a1a',
      borderBottomWidth: 1,
      borderBottomColor: '#1a1a1a',
      height: 3,
      marginTop: 5,
      marginBottom: 5,
    },
    ruleSingle: {
      borderTopWidth: 1,
      borderTopColor: '#888',
      marginTop: 5,
    },
    contactsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 4,
      marginBottom: 4,
    },
    contactItemWrap: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    contactItemText: {
      color: '#444',
      letterSpacing: 0.2,
    },
    section: {
      marginTop: sectionSpacing,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    sectionTitle: {
      fontSize: headingSize,
      fontFamily: 'Times-Bold',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      color: '#1a1a1a',
      marginRight: 8,
    },
    sectionTitleLine: {
      flex: 1,
      height: 1,
      backgroundColor: '#1a1a1a',
    },
    summary: {
      fontFamily: 'Times-Italic',
      color: '#222',
    },
    expItem: {
      marginBottom: 7,
    },
    expTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    company: {
      fontFamily: 'Times-Bold',
      color: '#1a1a1a',
      letterSpacing: 0.5,
    },
    period: {
      fontFamily: 'Times-Italic',
      color: '#555',
    },
    jobTitle: {
      fontFamily: 'Times-Italic',
      color: '#444',
      marginTop: 1,
      marginBottom: 3,
    },
    bullets: {
      paddingLeft: 16,
      marginTop: 3,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 1.5,
    },
    bulletPoint: {
      width: 10,
    },
    bulletText: {
      flex: 1,
      color: '#222',
    },
    subheadingText: {
      fontFamily: 'Times-Bold',
      marginTop: 2,
      marginBottom: 1,
      color: '#222',
    },
    skillRow: {
      flexDirection: 'row',
      marginBottom: 2,
    },
    skillKey: {
      fontFamily: 'Times-BoldItalic',
      width: '42mm',
      color: '#1a1a1a',
    },
    skillVal: {
      flex: 1,
      color: '#333',
    }
  });
};

interface ExecutivePdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function ExecutivePdf({ data, styles }: ExecutivePdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.name}>{pi.name || 'Your Name'}</Text>
          {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          
          <View style={s.ruleDouble} />
          <View style={s.contactsContainer}>
            {['phone', 'email', 'linkedin', 'github', 'website', 'location']
              .filter(f => (pi as any)[f])
              .map((f, i, arr) => (
                <View key={f} style={s.contactItemWrap}>
                  <Text style={s.contactItemText}>{(pi as any)[f]}</Text>
                  {i < arr.length - 1 && <Text style={s.contactItemText}>{'  |  '}</Text>}
                </View>
              ))}
          </View>
          <View style={s.ruleSingle} />
        </View>

        {pi.summary && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <Text style={s.sectionTitle}>Summary</Text>
              <View style={s.sectionTitleLine} />
            </View>
            <Text style={s.summary}>{pi.summary}</Text>
          </View>
        )}

        {data.experience.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <Text style={s.sectionTitle}>Professional Experience</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.experience.filter(e => e.visible).map(exp => (
              <View key={exp.id} style={s.expItem}>
                <View style={s.expTop}>
                  <Text style={s.company}>
                    {exp.company}
                    {exp.location && <Text> — {exp.location}</Text>}
                  </Text>
                  <Text style={s.period}>{exp.period}</Text>
                </View>
                {exp.title && <Text style={s.jobTitle}>{exp.title}</Text>}
                <View style={s.bullets}>
                  {exp.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.projects.filter(p => p.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <Text style={s.sectionTitle}>Key Projects</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.projects.filter(p => p.visible).map(proj => (
              <View key={proj.id} style={s.expItem}>
                <View style={s.expTop}>
                  <Text style={s.company}>
                    {proj.title}
                    {proj.subtitle && <Text> — {proj.subtitle}</Text>}
                  </Text>
                </View>
                <View style={s.bullets}>
                  {proj.bullets.filter(b => b.visible).map(b => (
                    b.isSubheading ? (
                      <Text key={b.id} style={s.subheadingText}>{b.text}</Text>
                    ) : (
                      <View key={b.id} style={s.bulletItem}>
                        <Text style={s.bulletPoint}>•</Text>
                        <Text style={s.bulletText}>{b.text}</Text>
                      </View>
                    )
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {data.skills.filter(sk => sk.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <Text style={s.sectionTitle}>Areas of Expertise</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.skills.filter(sk => sk.visible).map(sk => (
              <View key={sk.id} style={s.skillRow}>
                <Text style={s.skillKey}>{sk.category}:</Text>
                <Text style={s.skillVal}>{sk.items}</Text>
              </View>
            ))}
          </View>
        )}

        {data.education.filter(e => e.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <Text style={s.sectionTitle}>Education</Text>
              <View style={s.sectionTitleLine} />
            </View>
            {data.education.filter(e => e.visible).map(edu => (
              <View key={edu.id} style={s.expItem}>
                <View style={s.expTop}>
                  <Text style={s.company}>{edu.institution}</Text>
                  <Text style={s.period}>{edu.period}</Text>
                </View>
                <Text style={s.jobTitle}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}
        
        {data.responsibilities.filter(r => r.visible).length > 0 && (
          <View style={s.section}>
            <View style={s.sectionTitleContainer}>
              <Text style={s.sectionTitle}>Additional Leadership</Text>
              <View style={s.sectionTitleLine} />
            </View>
            <View style={s.bullets}>
              {data.responsibilities.filter(r => r.visible).map(r => (
                <View key={r.id} style={s.bulletItem}>
                  <Text style={s.bulletPoint}>•</Text>
                  <Text style={s.bulletText}>{r.text}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
}
