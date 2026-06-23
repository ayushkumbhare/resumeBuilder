import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData, StyleOptions } from '../types';

const createStyles = (styles: StyleOptions) => {
  const primaryColor = styles.primaryColor || '#0F2A4A';
  const accentColor = styles.accentColor || '#3b82f6';
  const bodySize = (styles.bodyFontSize || 9.5) + (styles.globalFontScale || 0);
  const headingSize = (styles.headingSize || 12) + (styles.globalFontScale || 0);
  const sidebarTitleSize = 11 + (styles.globalFontScale || 0);
  const nameSize = (styles.nameSize || 22) + (styles.globalFontScale || 0);
  const lineHeight = styles.lineHeight || 1.4;
  const sectionSpacing = (styles.sectionSpacing ?? 10) * 0.5;
  const marginMm = styles.documentMargin || 12;

  return StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: bodySize,
      color: '#475569',
      lineHeight: lineHeight,
    },
    sidebar: {
      width: '72mm',
      backgroundColor: '#f8fafc',
      borderRightWidth: 1,
      borderRightColor: '#e2e8f0',
      paddingTop: `${marginMm}mm`,
      paddingBottom: `${marginMm}mm`,
      paddingLeft: '8mm',
      paddingRight: '8mm',
    },
    sidebarHeader: {
      marginBottom: 16,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Helvetica-Bold',
      color: primaryColor,
      lineHeight: 1.1,
      marginBottom: 6,
      letterSpacing: -0.5,
    },
    headline: {
      fontSize: bodySize,
      color: accentColor,
      fontFamily: 'Helvetica-Bold',
    },
    sidebarContent: {
      flexDirection: 'column',
      gap: 16,
    },
    sidebarSection: {
      marginBottom: 16,
    },
    sidebarTitle: {
      fontSize: sidebarTitleSize,
      fontFamily: 'Helvetica-Bold',
      color: primaryColor,
      marginBottom: 6,
      letterSpacing: -0.2,
    },
    contactItem: {
      marginBottom: 6,
    },
    ciLabel: {
      fontSize: bodySize,
      fontFamily: 'Helvetica-Bold',
      textTransform: 'uppercase',
      color: '#94a3b8',
      marginBottom: 2,
      letterSpacing: 0.5,
    },
    ciValue: {
      color: '#475569',
    },
    eduItem: {
      marginBottom: 10,
    },
    eduDegree: {
      fontFamily: 'Helvetica-Bold',
      color: '#1e293b',
      marginBottom: 2,
    },
    eduInst: {
      color: '#475569',
      marginBottom: 2,
    },
    eduPeriod: {
      color: '#64748b',
    },
    skillItem: {
      marginBottom: 12,
    },
    skillCat: {
      fontFamily: 'Helvetica-Bold',
      color: '#1e293b',
      marginBottom: 6,
    },
    skillPills: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 4,
    },
    pill: {
      backgroundColor: '#e2e8f0',
      color: primaryColor,
      paddingVertical: 3,
      paddingHorizontal: 8,
      borderRadius: 10,
      fontFamily: 'Helvetica-Bold',
      fontSize: bodySize - 1,
    },
    main: {
      flex: 1,
      paddingTop: `${marginMm}mm`,
      paddingBottom: `${marginMm}mm`,
      paddingLeft: '10mm',
      paddingRight: '10mm',
    },
    section: {
      marginBottom: sectionSpacing,
    },
    sectionTitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: headingSize,
      fontFamily: 'Helvetica-Bold',
      color: primaryColor,
      letterSpacing: -0.5,
    },
    sectionTitleLine: {
      flex: 1,
      height: 2,
      backgroundColor: '#f1f5f9',
      marginLeft: 12,
    },
    body: {
      color: '#475569',
    },
    expItem: {
      marginBottom: 14,
    },
    expHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 6,
    },
    expHeaderLeft: {
      flex: 1,
    },
    expCompany: {
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a',
      marginBottom: 2,
    },
    expJobTitle: {
      fontFamily: 'Helvetica-Bold',
      color: accentColor,
    },
    expMeta: {
      textAlign: 'right',
    },
    expPeriod: {
      fontFamily: 'Helvetica-Bold',
      color: '#64748b',
    },
    expLocation: {
      color: '#64748b',
      marginTop: 2,
    },
    bullets: {
      paddingLeft: 12,
    },
    bulletItem: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    bulletPoint: {
      width: 10,
      color: '#475569',
    },
    bulletText: {
      flex: 1,
      color: '#475569',
    },
    subheadingText: {
      fontFamily: 'Helvetica-Bold',
      marginTop: 2,
      marginBottom: 2,
      color: '#1e293b',
    }
  });
};

interface StartupPdfProps {
  data: ResumeData;
  styles: StyleOptions;
}

export function StartupPdf({ data, styles }: StartupPdfProps) {
  const s = createStyles(styles);
  const pi = data.personalInfo;

  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.sidebar}>
          <View style={s.sidebarHeader}>
            <Text style={s.name}>{pi.name || 'Your Name'}</Text>
            {pi.headline && <Text style={s.headline}>{pi.headline}</Text>}
          </View>

          <View style={s.sidebarContent}>
            <View style={s.sidebarSection}>
              <Text style={s.sidebarTitle}>Contact</Text>
              {['email', 'phone', 'location', 'linkedin', 'github', 'website']
                .filter(f => (pi as any)[f])
                .map(f => (
                  <View key={f} style={s.contactItem}>
                    <Text style={s.ciLabel}>{f}</Text>
                    <Text style={s.ciValue}>{(pi as any)[f]}</Text>
                  </View>
                ))}
            </View>

            {data.education.filter(e => e.visible).length > 0 && (
              <View style={s.sidebarSection}>
                <Text style={s.sidebarTitle}>Education</Text>
                {data.education.filter(e => e.visible).map(edu => (
                  <View key={edu.id} style={s.eduItem}>
                    <Text style={s.eduDegree}>{edu.degree}</Text>
                    <Text style={s.eduInst}>{edu.institution}</Text>
                    <Text style={s.eduPeriod}>{edu.period}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.skills.filter(sk => sk.visible).length > 0 && (
              <View style={s.sidebarSection}>
                <Text style={s.sidebarTitle}>Skills</Text>
                {data.skills.filter(sk => sk.visible).map(sk => (
                  <View key={sk.id} style={s.skillItem}>
                    <Text style={s.skillCat}>{sk.category}</Text>
                    <View style={s.skillPills}>
                      {sk.items.split(',').map(item => item.trim()).filter(Boolean).map((item, idx) => (
                        <Text key={idx} style={s.pill}>{item}</Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={s.main}>
          {pi.summary && (
            <View style={s.section}>
              <View style={s.sectionTitleContainer}>
                <Text style={s.sectionTitle}>Summary</Text>
                <View style={s.sectionTitleLine} />
              </View>
              <Text style={s.body}>{pi.summary}</Text>
            </View>
          )}

          {data.experience.filter(e => e.visible).length > 0 && (
            <View style={s.section}>
              <View style={s.sectionTitleContainer}>
                <Text style={s.sectionTitle}>Experience</Text>
                <View style={s.sectionTitleLine} />
              </View>
              {data.experience.filter(e => e.visible).map(exp => (
                <View key={exp.id} style={s.expItem}>
                  <View style={s.expHeader}>
                    <View style={s.expHeaderLeft}>
                      <Text style={s.expCompany}>{exp.company}</Text>
                      <Text style={s.expJobTitle}>{exp.title}</Text>
                    </View>
                    <View style={s.expMeta}>
                      <Text style={s.expPeriod}>{exp.period}</Text>
                      {exp.location && <Text style={s.expLocation}>{exp.location}</Text>}
                    </View>
                  </View>
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
                <Text style={s.sectionTitle}>Projects</Text>
                <View style={s.sectionTitleLine} />
              </View>
              {data.projects.filter(p => p.visible).map(proj => (
                <View key={proj.id} style={s.expItem}>
                  <View style={s.expHeader}>
                    <View style={s.expHeaderLeft}>
                      <Text style={s.expCompany}>{proj.title}</Text>
                      <Text style={s.expJobTitle}>{proj.subtitle}</Text>
                    </View>
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

          {data.responsibilities.filter(r => r.visible).length > 0 && (
            <View style={s.section}>
              <View style={s.sectionTitleContainer}>
                <Text style={s.sectionTitle}>Responsibility</Text>
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
        </View>
      </Page>
    </Document>
  );
}
